from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, schema
import crud.campaign as crud
import crud.user as crudUser
from dependencies import get_db  
from models import CampaignPlayer


router = APIRouter()


@router.post("/newcampaign/")
async def create_new_campaign(campaign: schema.CampaignCreate, db: Session = Depends(get_db)):
    # A partir do email, obter o usuário
    user_email = campaign.user_email
    try:
        # Chama a função de criação da campanha passando o email do usuário
        new_campaign = crud.create_campaign(db, campaign, user_email)
        return {"message": "Campaign created successfully", "campaign": new_campaign}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/campaigns/{email}")
async def get_campaigns(email: str, db: Session = Depends(get_db)):
    user = crudUser.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
   
    campaigns = user.campaigns
    return {"data": {"campaigns": campaigns}}

@router.get("/campaign/{code}")
async def get_campaign(code: str, db: Session = Depends(get_db)):
    campaign = crud.get_campaign_by_code(db, code)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
   
    return {"data": {"campaign": campaign}}

@router.get("/campaigns/")
async def get_all_campaigns(db: Session = Depends(get_db)):
    campaigns = crud.get_all_campaigns(db)
    return {"data": {"campaigns": campaigns}}

@router.get("/users-campaigns")
def get_user_campaigns(user_email: str, db: Session = Depends(get_db)):
    user = crudUser.get_user_by_email(db, user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Buscar as campanhas em que o usuário está participando
    campaign_players = db.query(CampaignPlayer).filter(CampaignPlayer.player_id == user.id).all()

    # Construir a resposta incluindo o campo `is_master`
    campaigns = [
        {
            "id": cp.campaign.id,
            "name": cp.campaign.name,
            "system_rpg": cp.campaign.system_rpg,
            "description": cp.campaign.description,
            "code": cp.campaign.code,
            "is_master": cp.is_master  # Incluindo a informação de mestre
        }
        for cp in campaign_players
    ]
    
    return campaigns
