# main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes.routes import router as companies_router
from routes.auth import router as auth_router
from src.pdf_database import router as pdf_router
from chatbot import router as chatbot_router
from comapny_profile import router as dynamic_router
from routes.dynamic_routes import router as dynamic_routing
# 1. Import your tickets router
from tickets import router as tickets_router 

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(companies_router)
app.include_router(auth_router)
app.include_router(pdf_router)
app.include_router(chatbot_router) 
app.include_router(dynamic_router) 
app.include_router(dynamic_routing)
# 2. Include the tickets router
app.include_router(tickets_router) 
