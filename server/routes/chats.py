from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from sqlalchemy.orm import Session
import crud, schema, dependencies
import crud.chat as crud
import services.chat_message as chat_message 
import services.chat_image as chat_image


router = APIRouter()

chat_assistant = chat_message.AIAssistantWikiGuide()


@router.post("/chat", response_model=schema.ChatResponse)
async def chat(request: schema.ChatRequest, db: Session = Depends(dependencies.get_db)):
    bot_response = chat_assistant.wiki_guide(request.content)
    message = crud.create_chat_message(db, request.content, bot_response)
    return message

@router.post("/generate-image", response_model=schema.ImageResponse)
async def generate_image(request: schema.ChatRequest, db: Session = Depends(dependencies.get_db)):
    # Gerar a imagem com base no conteúdo
    bot_response = chat_image.wiki_image(request.content)  
    if bot_response:
        # Salvar a mensagem no banco de dados
        # crud.create_chat_message(db, request.content, bot_response)
        return {"image_url": bot_response}
    
    # Caso a resposta não seja uma imagem válida, lançar exceção
    raise HTTPException(status_code=400, detail="Erro ao gerar imagem.")