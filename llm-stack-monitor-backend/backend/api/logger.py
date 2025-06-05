from fastapi import APIRouter, HTTPException, status, Form, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import Session
from sqlalchemy import select
from database import get_sync_session, get_async_session
from auth.dependencies import get_current_user

def logger(
    username: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_sync_session),
    current_user: dict = Depends(get_current_user)
):
    
    return True