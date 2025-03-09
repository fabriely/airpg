from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from sqlalchemy.orm import Session
import crud, schema, dependencies
import crud.chat as crud
import ai_assistant_wiki_guide 


router = APIRouter()

assistant = ai_assistant_wiki_guide.AIAssistantWikiGuide()


@router.post("/chat", response_model=schema.ChatResponse)
async def chat(request: schema.ChatRequest, db: Session = Depends(dependencies.get_db)):
    bot_response = assistant.wiki_guide(request.content)
    message = crud.create_chat_message(db, request.content, bot_response)
    return message