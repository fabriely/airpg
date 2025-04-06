from sqlalchemy.orm import Session
from fastapi import HTTPException
import schema
import random
import string
from sqlalchemy.orm import Session, joinedload
from models import Campaign, User, CampaignPlayer, Character
from uuid import uuid4


# Função para criar personagem
def create_new_character(db: Session, character: schema.CharacterCreate, user_id, campaign_id):

    # Criar o objeto da campanha
    character = Character(
        name=character.name,
        class_level=character.class_level,
        background=character.background,
        raceSize=character.raceSize,
        alignment=character.alignment,
        experience_points=character.experience_points,
        strength=character.strength,
        dexterity=character.dexterity,
        constitution=character.constitution,
        intelligence=character.intelligence,
        wisdom=character.wisdom,
        charisma=character.charisma,
        initiative=character.initiative,
        hit_points=character.hit_points,
        temporary_hit_points=character.temporary_hit_points,
        weapons=character.weapons,
        armor=character.armor,
        campaign_id=campaign_id,
        player_id=user_id,
        is_master=character.is_master,
        is_player=character.is_player
        
    )

    # Adicionar à sessão e salvar no banco de dados
    db.add(character)
    db.commit()
    db.refresh(character)

    return character

#Função para pegar as campanhas do usuário
def get_character_by_user(db: Session, user_id: str):
    return db.query(Character).filter(Character.user_id == user_id).all()

#Função para obter a campanha pelo código
def get_character_by_campaign(db: Session, campaign_id: str):
    return db.query(Character).filter(Character.campaign_id == campaign_id).all()

def update_character(db: Session, character_id: UUID, updates: schema.CharacterUpdate):
    character = db.query(Character).get(character_id)

    if not character:
        raise HTTPException(status_code=404, detail="Character not found")

    update_data = updates.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(character, field, value)

    db.commit()
    db.refresh(character)

    return character

def delete_character(db: Session, character_id: UUID):
    character = db.query(Character).get(character_id)

    if not character:
        raise HTTPException(status_code=404, detail="Personagem não encontrado")

    db.delete(character)
    db.commit()

    return {"detail": "Personagem deletado com sucesso"}
