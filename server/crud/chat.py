from sqlalchemy.orm import Session
from models import ChatMessage

def create_chat_message(db: Session, user_message: str, bot_response: str):
    message = ChatMessage(user_message=user_message, bot_response=bot_response)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message

def get_chat_history(db: Session, limit: int = 10):
    return db.query(ChatMessage).order_by(ChatMessage.created_at.desc()).limit(limit).all()
