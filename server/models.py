# app/models.py
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()
  
class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    campaigns = relationship("Campaign", back_populates="user")  
    players = relationship("CampaignPlayer", back_populates="player")  

class Campaign(Base):
    __tablename__ = "campaigns"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String)
    system_rpg = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user = relationship("User", back_populates="campaigns") 
    description = Column(String)
    code = Column(String, unique=True, index=True)
    players = relationship("CampaignPlayer", back_populates="campaign")  



class CampaignPlayer(Base):
    __tablename__ = "campaign_players"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    character_name = Column(String, nullable=False)  # Nome do personagem
    character_class = Column(String, nullable=False)  # Classe do personagem
    campaign_id = Column(UUID(as_uuid=True), ForeignKey("campaigns.id"))
    campaign = relationship("Campaign", back_populates="players")  
    player_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    player = relationship("User", back_populates="players")  
    is_master = Column(Integer)
    is_player = Column(Integer)


class Character(Base):
    __tablename__ = "characters"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)  # Nome do personagem
    class_level = Column(String, nullable=False)  # Classe do personagem
    background: Column(String, nullable=False)
    raceSize: Column(String, nullable=False)
    alignment: Column(String, nullable=False)
    experience_points: Column(Integer)
    strength: Column(Integer)
    dexterity: Column(Integer)
    constitution: Column(Integer)
    intelligence: Column(Integer)
    wisdom: Column(Integer)
    charisma: Column(Integer)
    initiative: Column(Integer)
    hit_points: Column(Integer)
    temporary_hit_points: Column(Integer)
    weapons: Column(Integer)
    armor: Column(Integer)
    campaign_id = Column(UUID(as_uuid=True), ForeignKey("campaigns.id"))
    campaign = relationship("Campaign", back_populates="characters")  
    player_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    player = relationship("User", back_populates="characters")  
    is_master = Column(Integer)
    is_player = Column(Integer)