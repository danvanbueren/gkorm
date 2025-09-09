"""Base definitions for database tables."""

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

from app.database_enums import *

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    PKEY_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

class UsersTable(BaseModel):
    __tablename__ = "users_table"
    amis_id = Column(Integer, unique=True, index=True, nullable=False)
    rank = Column(Enum(Ranks), nullable=True)
    given_name = Column(String(255), nullable=True)
    family_name = Column(String(255), nullable=True)
    crew_position = Column(Enum(CrewPositions), nullable=True)
    crew_position_modifier = Column(Enum(CrewPositionModifiers), nullable=True)
    assigned_unit = Column(Enum(Units), nullable=True)
    missions = relationship("MissionsTable", back_populates="owner")

class UserPermissionsTable(BaseModel):
    __tablename__ = "user_permissions_table"
    FKEY_users_TABLE_parent_id = Column(Integer, ForeignKey("users_table.PKEY_id"), unique=True, nullable=False)
    global_permission_level = Column(Enum(GlobalPermissions), default=GlobalPermissions.BASIC, nullable=False)

class MissionsTable(BaseModel):
    __tablename__ = "missions_table"
    mission_number = Column(String(255), index=True, unique=True, nullable=False)
    FKEY_users_TABLE_owner_id = Column(Integer, ForeignKey("users_table.PKEY_id"), nullable=False)
    execution_date = Column(DateTime, nullable=True)
    owner = relationship("UsersTable", back_populates="missions")

class MemberMissionAssignmentsTable(BaseModel):
    __tablename__ = "member_mission_assignments_table"
    FKEY_missions_TABLE_parent_id = Column(Integer, ForeignKey("missions_table.PKEY_id"), nullable=False)
    FKEY_users_TABLE_member_id = Column(Integer, ForeignKey("users_table.PKEY_id"), nullable=False)
    crew_position_override = Column(Enum(CrewPositions))
    crew_position_modifier_override = Column(Enum(CrewPositionModifiers))

class WorksheetsTable(BaseModel):
    __tablename__ = "worksheets_table"
    worksheet_type = Column(Enum(WorksheetTypes), nullable=False)
    FKEY_missions_TABLE_parent_id = Column(Integer, ForeignKey("missions_table.PKEY_id"), nullable=False)
    FKEY_member_mission_assignments_TABLE_parent_id = Column(Integer, ForeignKey("member_mission_assignments_table.PKEY_id"))

class WorksheetQuestionResponsesTable(BaseModel):
    __tablename__ = "worksheet_question_responses_table"
    FKEY_worksheets_TABLE_parent_id = Column(Integer, ForeignKey("worksheets_table.PKEY_id"), nullable=False)
    question_number = Column(Integer, nullable=False)
    response = Column(Enum(RiskLevels))

class WorksheetRiskAcceptanceAuthoritySignaturesTable(BaseModel):
    __tablename__ = "worksheet_risk_acceptance_authority_signatures_table"
    FKEY_worksheets_TABLE_parent_id = Column(Integer, ForeignKey("worksheets_table.PKEY_id"), nullable=False)
    FKEY_users_TABLE_approver_id = Column(Integer, ForeignKey("users_table.PKEY_id"), nullable=False)
    authority_level = Column(Enum(RiskLevels), nullable=False)
    short_name = Column(String(255), nullable=False)
    long_name = Column(String(255), nullable=False)