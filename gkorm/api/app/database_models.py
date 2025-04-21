"""Base definitions for database tables."""
import enum

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class CrewPositions(enum.Enum):
    PILOT = "pilot"
    FLIGHT_ENGINEER = "flight_engineer"
    TACTICAL_DIRECTOR = "tactical_director"
    FIGHTER_ALLOCATOR = "fighter_allocator"
    WEAPONS_CONTROLLER = "weapons_controller"
    FIGHTER_ALLOCATOR_WEAPONS_CONTROLLER = "fighter_allocator_weapons_controller"
    SURVEILLANCE_CONTROLLER = "surveillance_controller"
    PASSIVE_CONTROLLER = "passive_controller"
    SURVEILLANCE_OPERATOR = "surveillance_operator"
    SYSTEM_TECHNICIAN = "system_technician"
    COMMUNICATIONS_TECHNICIAN = "communications_technician"
    RADAR_TECHNICIAN = "radar_technician"
    UNQUALIFIED = "unqualified"
    PASSENGER = "passenger"

class CrewPositionModifiers(enum.Enum):
    EVALUATOR = "evaluator"
    INSTRUCTOR = "instructor"
    LINK = "link"

class Units(enum.Enum):
    FLYING_SQUADRON_1 = "flying_squadron_1"
    FLYING_SQUADRON_2 = "flying_squadron_2"
    AIRCREW_TRAINING_SQUADRON = "aircrew_training_squadron"

class GlobalPermissions(enum.Enum):
    BASIC = "basic"
    SQUADRON_DIRECTOR_OF_OPERATIONS = "squadron_director_of_operations"
    SQUADRON_COMMANDER = "squadron_commander"
    OPERATIONS_WING_COMMANDER = "operations_wing_commander"
    SYSTEM_ADMINISTRATOR = "system_administrator"

class RiskLevels(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class WorksheetTypes(enum.Enum):
    MISSION_PLANNING_RISK_ASSESSMENT = "mission_planning_risk_assessment"
    DAY_OF_MISSION_RISK_ASSESSMENT = "day_of_mission_risk_assessment"
    PERSONAL_RISK_ASSESSMENT = "personal_risk_assessment"
    PILOT_PROFICIENCY_RISK_ASSESSMENT = "pilot_proficiency_risk_assessment"

class BaseModel(Base):
    __abstract__ = True
    PKEY_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

class UsersTable(BaseModel):
    __tablename__ = "users_table"
    amis_id = Column(Integer, unique=True, index=True, nullable=False)
    given_name = Column(String(255), nullable=False)
    family_name = Column(String(255), nullable=False)
    crew_position = Column(Enum(CrewPositions), default=CrewPositions.UNQUALIFIED, nullable=False)
    crew_position_modifier = Column(Enum(CrewPositionModifiers))
    assigned_unit = Column(Enum(Units))

class UserPermissionsTable(BaseModel):
    __tablename__ = "user_permissions_table"
    FKEY_users_TABLE_parent_id = Column(Integer, ForeignKey("users_table.id"), unique=True, nullable=False)
    global_permission_level = Column(Enum(GlobalPermissions), default=GlobalPermissions.BASIC, nullable=False)

class MissionsTable(BaseModel):
    __tablename__ = "missions_table"
    mission_number = Column(String(255), index=True, unique=True, nullable=False)
    FKEY_users_TABLE_owner_id = Column(Integer, ForeignKey("users_table.id"), unique=True, nullable=False)

class MemberMissionAssignmentsTable(BaseModel):
    __tablename__ = "member_mission_assignments_table"
    FKEY_missions_TABLE_parent_id = Column(Integer, ForeignKey("missions_table.id"), nullable=False)
    FKEY_users_TABLE_member_id = Column(Integer, ForeignKey("users_table.id"), nullable=False)
    crew_position_override = Column(Enum(CrewPositions))

class WorksheetsTable(BaseModel):
    __tablename__ = "worksheets_table"
    worksheet_type = Column(Enum(WorksheetTypes), nullable=False)
    FKEY_missions_TABLE_parent_id = Column(Integer, ForeignKey("missions_table.id"), nullable=False)
    FKEY_member_mission_assignments_TABLE_parent_id = Column(Integer, ForeignKey("member_mission_assignments_table.id"))

class WorksheetQuestionResponsesTable(BaseModel):
    __tablename__ = "worksheet_question_responses_table"
    FKEY_worksheets_TABLE_parent_id = Column(Integer, ForeignKey("worksheets_table.id"), nullable=False)
    question_number = Column(Integer, nullable=False)
    response = Column(Enum(RiskLevels))

class WorksheetRiskAcceptanceAuthoritySignaturesTable(BaseModel):
    __tablename__ = "worksheet_risk_acceptance_authority_signatures_table"
    FKEY_worksheets_TABLE_parent_id = Column(Integer, ForeignKey("worksheets_table.id"), nullable=False)
    FKEY_users_TABLE_approver_id = Column(Integer, ForeignKey("users_table.id"), nullable=False)
    authority_level = Column(Enum(RiskLevels), nullable=False)
    short_name = Column(String(255), nullable=False)
    long_name = Column(String(255), nullable=False)