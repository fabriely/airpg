from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import ValidationError
from sqlalchemy import create_engine
from models import Base
from routes import users, campaigns, chats

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Table creation if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration to allow frontend requisitions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows just this frontend
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
    allow_credentials=True,
)

# Include Routers
app.include_router(users.router)
app.include_router(campaigns.router)
app.include_router(chats.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)