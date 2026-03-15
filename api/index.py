# This is the Vercel serverless wrapper for your FastAPI app
import sys
import os

# Add backend folder to path so we can import from it
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app  # imports your FastAPI app from backend/main.py

# Vercel needs the handler to be named 'app'
# FastAPI is already ASGI compatible — nothing else needed
