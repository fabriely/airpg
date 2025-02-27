# app/crud.py
from sqlalchemy.orm import Session
from bcrypt import hashpw, gensalt
from models import User
from sqlalchemy.orm import Session


def create_user(db: Session, name_user: str, email: str, password: str):
    # Gerando o salt e o hash da senha
    hashed_password = hashpw(password.encode('utf-8'), gensalt())
  
    # Criando o usuário com todas as informações obrigatórias
    user = User(
      name_user = name_user,
      email = email,
      password = hashed_password.decode('utf-8')
    )
  
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()




