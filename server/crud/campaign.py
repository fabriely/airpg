from sqlalchemy.orm import Session
import schema
import random
import string
from sqlalchemy.orm import Session
from models import Campaign, User, CampaignPlayer
from uuid import uuid4

def generate_campaign_code(length=6):
    """Generate a random string of letters and digits."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


# Função para criar a campanha
def create_campaign(db: Session, campaign: schema.CampaignCreate, user_email: str):
    # Gerar código único para a campanha
    code = generate_campaign_code()

    # Obter o usuário com base no email
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise ValueError("Usuário não encontrado")
    

    # Criar o objeto da campanha
    db_campaign = Campaign(
        name=campaign.name,
        system_rpg=campaign.system_rpg,
        description=campaign.description,
        user_id=user.id,  # Usando o user_id do usuário
        code=code  # Código gerado automaticamente
    )

    # Adicionar à sessão e salvar no banco de dados
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)

    # Criar um jogador 
    campaign_player = CampaignPlayer(
        campaign_id=db_campaign.id,
        player_id=user.id,
        is_master=1,  # O usuário é o mestre da campanha
        is_player=0  
    )

    # Adicionar à sessão e salvar o jogador
    db.add(campaign_player)
    db.commit()

    return db_campaign

#Função para pegar as campanhas do usuário
def get_campaign_by_user(db: Session, user_id: str):
    return db.query(Campaign).filter(Campaign.user_id == user_id).all()

#Função para obter a campanha pelo código
def get_campaign_by_code(db: Session, code: str):
    return db.query(Campaign).filter(Campaign.code == code).first()

#Função para entrar na campanha
def join_campaign(db: Session, join: schema.JoinCampaign):
    # Obter a campanha com base no código
    campaign = get_campaign_by_code(db, join.code)
    if not campaign:
        raise ValueError("Campanha não encontrada")

    # Obter o usuário com base no email
    user = db.query(User).filter(User.email == join.user_email).first()
    if not user:
        raise ValueError("Usuário não encontrado")

    # Verificar se o usuário já está na campanha
    campaign_player = db.query(CampaignPlayer).filter(CampaignPlayer.campaign_id == campaign.id, CampaignPlayer.player_id == user.id).first()
    if campaign_player:
        raise ValueError("Usuário já está na campanha")

    # Criar um jogador
    campaign_player = CampaignPlayer(
        campaign_id=campaign.id,
        player_id=user.id,
        is_master=0,
        is_player=1
    )

    # Adicionar à sessão e salvar o jogador
    db.add(campaign_player)
    db.commit()