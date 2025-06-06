
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.database import get_sync_session
from models.user import APIKey
import secrets

def generate_api_key(length: int = 32) -> str:
    """Generate a secure random API key."""
    return secrets.token_urlsafe(length)

def create_api_key_for_user(user_id: int, db_session) -> str:
    key = generate_api_key()
    new_key = APIKey(key=key, user_id=user_id)
    db_session.add(new_key)
    db_session.commit()
    return key

security = HTTPBearer()

def verify_api_key(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db_session = Depends(get_sync_session)  # assume you have a DB session dependency
):
    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme.",
        )

    api_key = credentials.credentials
    key_entry = db_session.query(APIKey).filter_by(key=api_key).first()

    if not key_entry:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired API key.",
        )

    return key_entry.user  # This user object can be injected into routes
