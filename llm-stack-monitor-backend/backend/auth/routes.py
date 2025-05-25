from fastapi import APIRouter, HTTPException, status, Form, Depends
from auth.jwt_handler import create_access_token
from auth.hashing import verify_password , hash_password
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import Session
from sqlalchemy import select
from database import get_sync_session, get_async_session
from models.user import User
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UserRegisterModel(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponseModel(BaseModel):
    id: int
    username: str
    email: EmailStr
    
    class Config:
        orm_mode = True


@router.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_sync_session)
):
    # Synchronous query to get the user
    user = session.query(User).filter(User.username == username).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # Password verification (passlib)
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register/", response_model=UserResponseModel)
async def register(user: UserRegisterModel, session: AsyncSession = Depends(get_async_session)):
    # Check if username or email already exists (optional but recommended)
    existing_user = await session.execute(
        select(User).where((User.username == user.username) | (User.email == user.email))
    )
    if existing_user.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username or email already exists.")
    
    # Hash the password
    hashed_password = hash_password(user.password)
    
    # Create User object
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password  # Correctly hashed password
    )
    
    # Add and commit
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    
    return new_user