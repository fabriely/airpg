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
    campaign_id = Column(UUID(as_uuid=True), ForeignKey("campaigns.id"))
    campaign = relationship("Campaign", back_populates="players")  
    player_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    player = relationship("User", back_populates="players")  
    is_master = Column(Integer)
    is_player = Column(Integer)