import os
from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/api/config")
async def get_config():
    return {
        "google_client_id": os.getenv("GOOGLE_CLIENT_ID", "")
    }


@router.get("/")
async def get_auth():
    return FileResponse("static/auth.html")


@router.get("/home")
async def get_home():
    return FileResponse("static/home.html")


@router.get("/contactus")
async def get_contact_us():
    return FileResponse("static/contactus.html")


@router.get("/profile")
async def get_profile():
    return FileResponse("static/profile.html")


@router.get("/tickets")
async def get_profile():
    return FileResponse("static/tickets.html")



