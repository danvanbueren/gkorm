"""Configuration for database."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

USERNAME = 'username'
PASSWORD = 'password'
HOST = 'database'
PORT = 5432
DATABASE = 'gkorm'
URL = f'postgresql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'

engine = create_engine(URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()