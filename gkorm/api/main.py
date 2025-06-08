"""API entrypoint and initialization."""

# TODO: When deploying production build, remove localhost from origins array

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config_database import engine, get_db
from app.database_models import Base
from app.routes import status, users, missions

app = FastAPI()
Base.metadata.create_all(bind=engine)

# TODO: Change for production
origins = [
    "http://localhost:3000",
    "http://frontend:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status.router, prefix="/status")
app.include_router(missions.router, prefix="/missions")
app.include_router(users.router, prefix="/users")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)