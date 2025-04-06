from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

import schema
from database import get_db
from services.character_service import (
    create_new_character,
    get_character_by_user,
    get_character_by_campaign,
    update_character,
    delete_character
)

router = APIRouter(
    prefix="/characters",
    tags=["Characters"]
)

# Criar personagem
@router.post("/", response_model=schema.CharacterOut)
def create_character(
    character: schema.CharacterCreate,
    user_id: UUID,
    campaign_id: UUID,
    db: Session = Depends(get_db)
):
    return create_new_character(db, character, user_id, campaign_id)


# Listar personagens por usuário
@router.get("/user/{user_id}", response_model=List[schema.CharacterOut])
def list_characters_by_user(user_id: UUID, db: Session = Depends(get_db)):
    return get_character_by_user(db, user_id)


# Listar personagens por campanha
@router.get("/campaign/{campaign_id}", response_model=List[schema.CharacterOut])
def list_characters_by_campaign(campaign_id: UUID, db: Session = Depends(get_db)):
    return get_character_by_campaign(db, campaign_id)


# Atualizar personagem
@router.put("/{character_id}", response_model=schema.CharacterOut)
def update_character_route(
    character_id: UUID,
    updates: schema.CharacterUpdate,
    db: Session = Depends(get_db)
):
    return update_character(db, character_id, updates)


# Deletar personagem
@router.delete("/{character_id}")
def delete_character_route(character_id: UUID, db: Session = Depends(get_db)):
    return delete_character(db, character_id)
