from pydantic import BaseModel, constr, field_validator
from uuid import UUID

# Definindo o schema de base do usuário
class UserBase(BaseModel):
    email: str

# Definindo o schema para a criação de um usuário
class UserCreate(UserBase):
    password: constr(min_length=8)
    username: str

    @field_validator('password')
    def password_complexity(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha precisa ter pelo menos um número')
        if not any(char in '!@#$%^&*(),.?":{}|<>_-+=~`[]\\;\'/' for char in v):
            raise ValueError('A senha precisa ter pelo menos um caractere especial')
        return v


# Definindo o schema base para a campanha
class CampaignBase(BaseModel):
    name: str
    system_rpg: str
    description: str

    class Config:
        orm_mode = True

class CampaignCreate(CampaignBase):
    user_email: str

# Definindo a campanha no banco
class Campaign(CampaignBase):
    id: UUID
    user_id: UUID
    code: str


    class Config:
        orm_mode = True

#Definindo o schema para a criação de um jogador
class CampaignPlayerBase(BaseModel):
    campaign_id: UUID
    player_id: UUID
    is_master: int
    is_player: int





