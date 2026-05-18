# main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routes.routes import router as companies_router
from routes.auth import router as auth_router
from src.pdf_database import router as pdf_router
from chatbot import router as chatbot_router
from comapny_profile import router as dynamic_router
from routes.dynamic_routes import router as dynamic_routing
from tickets import router as tickets_router 

app = FastAPI()

# Mount compiled Vite React static assets
app.mount("/static", StaticFiles(directory="frontend/dist"), name="static")

# Include backend API/page routes
app.include_router(companies_router)
app.include_router(auth_router)
app.include_router(pdf_router)
app.include_router(chatbot_router) 
app.include_router(dynamic_router) 
app.include_router(dynamic_routing)
app.include_router(tickets_router) 

# Robust Catch-all Route for React Router Single Page Application (SPA)
@app.get("/{catchall:path}")
async def catch_all(catchall: str):
    # Exclude standard API prefixes to allow proper API 404 responses
    if any(catchall.startswith(prefix) for prefix in ["api/", "auth/", "company/", "tickets/", "raised/", "upload"]):
        return {"detail": "Not Found"}
    return FileResponse("frontend/dist/index.html")
