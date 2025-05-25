# routes/protected_routes.py
from fastapi import APIRouter, Depends
from auth.dependencies import get_current_user

router = APIRouter()

@router.get("/protected-route")
def protected_route(current_user: dict = Depends(get_current_user)):
    
    return {"message": "This is a protected route", "user": current_user}
