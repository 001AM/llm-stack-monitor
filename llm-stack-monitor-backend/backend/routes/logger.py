from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from auth.dependencies import get_current_user
from db.database import get_sync_session

router = APIRouter()

@router.post("/logger/")
async def logger(
    request: Request,
    session: Session = Depends(get_sync_session),
):
    body = await request.json()  # Get JSON body
    print("Received JSON body:", body)

    return {"status": "logged"}
