from fastapi import APIRouter, HTTPException, status, Form, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy import select, or_

from db.database import get_sync_session, get_async_session
from models.user import User
from auth.jwt_handler import create_access_token
from auth.hashing import verify_password, hash_password
from pydantic import BaseModel, EmailStr

router = APIRouter()


# Pydantic Schemas
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


# Login (sync)
@router.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
    session: Session = Depends(get_sync_session)
):
    user = session.query(User).filter(User.username == username).first()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password"
        )

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


# Register (async)
@router.post("/register/", response_model=UserResponseModel)
async def register(
    user: UserRegisterModel,
    session: AsyncSession = Depends(get_async_session)
):
    # Check if user already exists
    result = await session.execute(
        select(User).where(
            or_(
                User.username == user.username,
                User.email == user.email
            )
        )
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists."
        )

    hashed_pw = hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return new_user
