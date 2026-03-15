from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import requests
import plotly.express as px
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",          # local dev
        "https://pyclimaexplorer.vercel.app",    # your Vercel URL
        "*"                               # or allow all during hackathon
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

CITIES_PATH = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "cities.csv")
try:
    cities_df = pd.read_csv(CITIES_PATH)
except Exception as e:
    cities_df = pd.DataFrame()
    print("Warning: Could not load cities.csv", e)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI is running directly!"}

@app.get("/api")
def read_api_root():
    return {"status": "ok", "message": "FastAPI is running at /api!"}

@app.get("/api/climate/{city}")
@app.get("/climate/{city}")
def get_climate_data(city: str):
    if cities_df.empty:
        raise HTTPException(status_code=500, detail="Cities dataset not available.")

    city_match = cities_df[cities_df["city_name"].str.lower() == city.lower()]
    if city_match.empty:
        raise HTTPException(status_code=404, detail="City not found in database.")
    
    city_info = city_match.iloc[0]
    lat = city_info["latitude"]
    lon = city_info["longitude"]

    # We will fetch historical data from Open-Meteo from 1950 to 2023 for proper anomolies
    url = f"https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date=1980-01-01&end_date=2023-12-31&daily=temperature_2m_mean,precipitation_sum,wind_speed_10m_max&timezone=auto"
    
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch data from Open-Meteo API.")
    
    data = response.json()
    daily = data.get("daily", {})
    if not daily or not daily.get("time"):
        raise HTTPException(status_code=500, detail="No historical daily data found for this location.")

    df = pd.DataFrame({
        "date": pd.to_datetime(daily["time"]),
        "temperature": daily["temperature_2m_mean"],
        "precipitation": daily["precipitation_sum"],
        "wind_speed": daily["wind_speed_10m_max"]
    })
    
    # Pre-process for beautiful plotting
    df_yearly = df.resample('YE', on='date').mean().reset_index()
    df_yearly["Year"] = df_yearly["date"].dt.year

    charts_html = []

    # 1. Time-Series Line Plot
    fig1 = px.line(df_yearly, x="Year", y="temperature", title=f"Average Temperature (°C) in {city.title()} (1980-2023)", markers=True, labels={"temperature": "Temperature (°C)"})
    fig1.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"))
    fig1.update_traces(line_color="#FF6B6B", marker_color="#FF8E53")
    charts_html.append({
        "id": "timeseries", 
        "html": fig1.to_html(full_html=True, include_plotlyjs="cdn")
    })

    # 2. Anomaly Heatmap / Deviation Map
    df["Year"] = df["date"].dt.year
    df["Month"] = df["date"].dt.month
    monthly_avg = df.groupby(["Year", "Month"])["temperature"].mean().reset_index()
    pivot = monthly_avg.pivot(index="Month", columns="Year", values="temperature")
    overall_monthly_mean = monthly_avg.groupby("Month")["temperature"].mean()
    pivot_anomaly = pivot.sub(overall_monthly_mean, axis=0)

    fig2 = px.imshow(pivot_anomaly, title=f"Temperature Anomaly Heatmap (°C) - {city.title()}", aspect="auto", color_continuous_scale="RdBu_r")
    fig2.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"))
    charts_html.append({
        "id": "anomaly", 
        "html": fig2.to_html(full_html=True, include_plotlyjs="cdn")
    })

    # 3. Correlation Heatmap
    corr = df[["temperature", "precipitation", "wind_speed"]].rename(columns={
        "temperature": "Temp (°C)", 
        "precipitation": "Precip (mm)", 
        "wind_speed": "Wind (km/h)"
    }).corr()
    fig3 = px.imshow(corr, text_auto=True, title="Variable Correlation Matrix", aspect="auto", color_continuous_scale="Viridis")
    fig3.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"))
    charts_html.append({
        "id": "correlation", 
        "html": fig3.to_html(full_html=True, include_plotlyjs="cdn")
    })

    # 4. Regional Box Plot / Monthly Distribution
    fig4 = px.box(df, x="Month", y="temperature", title=f"Monthly Temperature Variance (°C) (1980-2023) - {city.title()}", color="Month", labels={"temperature": "Temperature (°C)"})
    fig4.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"), showlegend=False)
    charts_html.append({
        "id": "boxplot", 
        "html": fig4.to_html(full_html=True, include_plotlyjs="cdn")
    })

    # 5. 3D Rotating Globe Highlight
    globe_df = pd.DataFrame({"City": [city_info["city_name"]], "Lat": [lat], "Lon": [lon], "Temp": [df["temperature"].mean()]})
    fig5 = px.scatter_geo(globe_df, lat="Lat", lon="Lon", hover_name="City", size="Temp", projection="orthographic", title="Global Position Locator")
    fig5.update_geos(
        showocean=True, oceancolor="rgba(10, 10, 20, 0.8)",
        showland=True, landcolor="rgba(30, 30, 40, 0.8)",
        showcountries=True, countrycolor="rgba(255, 255, 255, 0.2)"
    )
    fig5.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"), geo=dict(bgcolor='rgba(0,0,0,0)'))
    charts_html.append({
        "id": "globe", 
        "html": fig5.to_html(full_html=True, include_plotlyjs="cdn")
    })
    
    # 6. Bar Chart: Yearly Precipitation
    fig6 = px.bar(df_yearly, x="Year", y="precipitation", title=f"Yearly Precipitation (mm) (1980-2023) - {city.title()}", labels={"precipitation": "Precipitation (mm)"})
    fig6.update_traces(marker_color="#00c8ff")
    fig6.update_layout(template="plotly_dark", plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)", font=dict(family="Inter, sans-serif", color="#e2e8f0", size=14), title_font=dict(size=20, color="white"))
    charts_html.append({
        "id": "precipitation_bar",
        "html": fig6.to_html(full_html=True, include_plotlyjs="cdn")
    })

    return {
        "city": city_info["city_name"],
        "country": city_info["country"],
        "charts": charts_html
    }
