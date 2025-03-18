# app/crud.py
from sqlalchemy.orm import Session
from bcrypt import hashpw, gensalt
from models import User, Notebook
from sqlalchemy.orm import Session
from typing import Dict, Any


def create_user(db: Session, username: str, email: str, password: str):
    # Gerando o salt e o hash da senha
    hashed_password = hashpw(password.encode('utf-8'), gensalt())
  
    # Criando o usuário com todas as informações obrigatórias
    user = User(
      username = username,
      email = email,
      password = hashed_password.decode('utf-8')
    )
  
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_notebook_by_email(db: Session, email: str):
    return (
        db.query(Notebook)
        .join(User)
        .filter(User.email == email).first()
    )
    
def save_notebook_by_email(db: Session, email: str, content: Dict[str, Any]):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    
    notebook = db.query(Notebook).filter(Notebook.user_id == user.id).first()
    if notebook:
        notebook.content = content
    else:
        notebook = Notebook(user_id=user.id, content=content)
        db.add(notebook)
    
    db.commit()
    db.refresh(notebook)

    return(notebook)
