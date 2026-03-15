from backend.main import app
from mangum import Mangum

# Vercel Serverless Function entrypoint
handler = Mangum(app)
