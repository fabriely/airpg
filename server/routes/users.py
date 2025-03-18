from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from typing import Dict
from sqlalchemy.orm import Session
import crud, schema, dependencies
import crud.user as crud


router = APIRouter()


@router.post("/users/")
async def create_user(request: schema.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.create_user(db=db, username=request.username, email=request.email, password=request.password)
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

@router.get("/notebook/")
async def get_notebook(email: str, db: Session = Depends(dependencies.get_db)):
    notebook = crud.get_notebook_by_email(db, email)
    if not notebook:
        return {"error": "Notebook not found"}
    return {"content": notebook.content, "updated_at": notebook.updated_at}

@router.post("/notebook/")
async def save_notebook(data: schema.NotebookData, db: Session = Depends(dependencies.get_db)):
    notebook = crud.save_notebook_by_email(db, data.email, data.content)
    if not notebook:
        return {"error": "User not found"}
    return {"message": "Notebook saved successfully", "updated_at": notebook.updated_at}