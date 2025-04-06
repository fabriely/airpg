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

class CampaignPlayerBase(BaseModel):
    campaign_id: UUID
    player_id: UUID
    character_name: str
    character_class: str
    is_master: bool
    is_player: bool

    class Config:
        orm_mode = True

class JoinCampaign(BaseModel):
    code: str
    user_email: str
    character_name: str
    character_class: str


class ValidateCampaign(BaseModel):
    code: str
    user_email: str


class CharacterCreate(BaseModel):
    character_name: str
    character_class: str
    background: str
    raceSize: str
    alignment: str
    experience_points: Optional[int] = 0
    strength: Optional[int] = 0
    dexterity: Optional[int] = 0
    constitution: Optional[int] = 0
    intelligence: Optional[int] = 0
    wisdom: Optional[int] = 0
    charisma: Optional[int] = 0
    initiative: Optional[int] = 0
    hit_points: Optional[int] = 0
    temporary_hit_points: Optional[int] = 0
    weapons: Optional[int] = 0
    armor: Optional[int] = 0
    is_master: Optional[int] = 0
    is_player: Optional[int] = 1
