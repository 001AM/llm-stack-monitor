from fastapi import FastAPI, Depends
from sqlmodel import Session
from database import init_db
from models.user import User
from auth.routes import router as auth_router  # Corrected import
from routes.protected_routes import router as protected_router  # Assuming you have routes her
import asyncio

app = FastAPI()
app.include_router(auth_router)
app.include_router(protected_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.on_event("startup")
async def on_startup():
    await init_db()
