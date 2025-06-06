# apikey.py

from fastapi import APIRouter, Depends
from auth.dependencies import get_current_user
from utils.apikey import create_api_key_for_user
from sqlalchemy.orm import Session
from db.database import get_sync_session
from models.user import User

router = APIRouter()

@router.post("/generate-api-key")
def create_api_key(
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_sync_session)
):
    username = current_user.get("sub")
    user = session.query(User).filter(User.username == username).first()

    if not user:
        raise ValueError("User not found in token")
    apikey = create_api_key_for_user(user_id=user.id, db_session=session)
    return {
        "message": "This is your API key",
        "apikey": apikey
    }
