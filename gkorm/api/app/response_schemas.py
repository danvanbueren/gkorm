from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

from app.database_enums import Ranks, CrewPositions, CrewPositionModifiers


class UserSchema(BaseModel):
    PKEY_id: int
    rank: Optional[Ranks]
    given_name: Optional[str]
    family_name: Optional[str]
    amis_id: int
    model_config = ConfigDict(from_attributes=True)

class MemberAssignmentSchema(BaseModel):
    PKEY_id: int
    FKEY_missions_TABLE_parent_id: int
    FKEY_users_TABLE_member_id: int
    crew_position_override: Optional[CrewPositions] = None
    crew_position_modifier_override: Optional[CrewPositionModifiers] = None
    user: Optional[UserSchema] = None
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

class MissionSchema(BaseModel):
    PKEY_id: int
    mission_number: str
    status: str
    execution_date: Optional[datetime]
    FKEY_users_TABLE_owner_id: int
    owner: Optional[UserSchema] = None
    members: list[MemberAssignmentSchema] = []
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

class MissionListResponseSchema(BaseModel):
    status: int
    message: str
    content: list[MissionSchema]
