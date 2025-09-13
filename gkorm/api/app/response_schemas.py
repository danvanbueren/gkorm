from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

from app.database_enums import Ranks


class UserSchema(BaseModel):
    PKEY_id: int
    rank: Optional[Ranks]
    given_name: Optional[str]
    family_name: Optional[str]
    amis_id: int
    model_config = ConfigDict(from_attributes=True)

class MissionSchema(BaseModel):
    PKEY_id: int
    mission_number: str
    status: str
    execution_date: Optional[datetime]
    FKEY_users_TABLE_owner_id: int
    owner: Optional[UserSchema] = None
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

class MissionListResponseSchema(BaseModel):
    status: int
    message: str
    content: list[MissionSchema]
