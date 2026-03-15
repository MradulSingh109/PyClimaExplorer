# PyClimaExplorer

PyClimaExplorer is a full-stack web application designed to visualize and explore historical climate data across various global cities. It leverages a modern frontend built with React and Vite, coupled with a fast and efficient backend powered by FastAPI.

## Features

- **Historical Climate Data Exploration**: View temperature, precipitation, and wind speed data for major cities from 1980 to 2023.
- **Interactive Visualizations**: High-quality, interactive charts generated using Plotly:
  - Time-Series Line Plots for Temperature
  - Temperature Anomaly Heatmaps
  - Variable Correlation Matrices
  - Monthly Temperature Variance Box Plots
  - 3D Rotating Globe Locator
  - Yearly Precipitation Bar Charts
- **Responsive Dashboard Interface**: A dark-themed, sleek user interface optimized for exploratory data analysis.

## Tech Stack

### Frontend
- **React** (v19)
- **Vite**
- **GSAP** (for animations)
- **CSS** (Custom styles with a modern dark theme)

### Backend
- **FastAPI**
- **Python** (Pandas, Requests, Plotly)
- **Uvicorn** (ASGI server)
- **Open-Meteo API** (Data Source)

## Project Structure

```bash
PyClimaExplorer/
├── backend/                # FastAPI backend code
│   ├── main.py             # Main application entry point
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Virtual environment (ignored in git)
├── frontend/               # React (Vite) frontend code
│   ├── public/             # Static assets (including cities.csv)
│   ├── src/                # React source code components
│   └── package.json        # Node.js dependencies
├── README.md               # Project documentation
├── requirements.txt        # Root requirements
└── .gitignore              # Git ignore file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `.\venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the FastAPI server:
```bash
python -m uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup

Open a separate terminal and navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Credits

- Data is sourced from the [Open-Meteo Archive API](https://open-meteo.com/).
