from pydantic import BaseModel
from pydantic import BaseModel, constr, field_validator
from uuid import UUID

class UserBase(BaseModel):
    email: str
    
class UserCreate(UserBase):
    password: constr(min_length=8)
    name_user: str

    @field_validator('password')
    def password_complexity(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha precisa ter pelo menos um número')
        if not any(char in '!@#$%^&*(),.?":{}|<>_-+=~`[]\\;\'/' for char in v):
            raise ValueError('A senha precisa ter pelo menos um caractere especial')
        return v



class CampaignCreate(BaseModel):
    name: str
    system_rpg: str
    description: str
    user_email: str  # Adiciona o campo user_email
    
    class Config:
        orm_mode = True  # Isso é necessário para que o Pydantic converta os dados para o modelo ORM

