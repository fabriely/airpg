from fastapi import APIRouter, Depends, HTTPException, WebSocket
from sqlalchemy.orm import Session
import crud, schema, dependencies
import crud.chat as crud
import services.chat_message as chat_message
import services.chat_image as chat_image
import asyncio

router = APIRouter()
chat_assistant = chat_message.AIAssistantWikiGuide()

# Lista de conexões WebSocket ativas
active_connections = []

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    print("Novo usuário conectado ao WebSocket!")

    try:
        while True:
            await websocket.receive_text()  # Mantém a conexão aberta
    except:
        print("Usuário desconectado!")
        active_connections.remove(websocket)

# Função para enviar notificações aos jogadores
async def notify_clients(message: str):
    for connection in active_connections:
        try:
            await connection.send_text(message)
        except:
            active_connections.remove(connection)

@router.post("/generate-image", response_model=schema.ImageResponse)
async def generate_image(request: schema.ChatRequest, db: Session = Depends(dependencies.get_db)):
    bot_response = chat_image.wiki_image(request.content)
    
    if bot_response:
        # Salvar a mensagem no banco de dados
        # crud.create_chat_message(db, request.content, bot_response)
        # Notifica os jogadores via WebSocket que uma nova imagem foi gerada
        asyncio.create_task(notify_clients("new_image"))  
        return {"image_url": bot_response}
    
    raise HTTPException(status_code=400, detail="Erro ao gerar imagem.")
