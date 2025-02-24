from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from sqlalchemy.orm import Session
import crud, schema, dependencies
import crud.user as crud


router = APIRouter()


@router.post("/users/")
async def create_user(request: schema.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.create_user(db=db, name_user=request.name_user, email=request.email, password=request.password)
    return {"data": {"user": user}}

@router.post("/sessions")
async def login(request: schema.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_email(db, request.email)
    if user and checkpw(request.password.encode('utf-8'), user.password.encode('utf-8')):
            return {"data": {"user": user}}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/users/{email}") 
async def get_user(email: str, db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_email(db, email)
    if user:
        return {"data": {"user": user}}
    raise HTTPException(status_code=404, detail="User not found")