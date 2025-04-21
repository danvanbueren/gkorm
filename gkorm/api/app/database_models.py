"""Base definitions for database tables."""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

# Abstract Base: created_at, updated_at
class BaseModel(Base):
    __abstract__ = True
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

# Root Users Table
class UsersTable(BaseModel):
    __tablename__ = "users_table"
    pkey_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    display_name = Column(String(100), unique=True, index=True, nullable=False)
    last_active = Column(DateTime, default=func.now(), nullable=False, index=True)
    disabled = Column(Boolean, default=False, nullable=False)