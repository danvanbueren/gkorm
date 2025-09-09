from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

from app.database_enums import Ranks


class UserOut(BaseModel):
    PKEY_id: int
    rank: Optional[Ranks]
    given_name: Optional[str]
    family_name: Optional[str]
    model_config = ConfigDict(from_attributes=True)

class MissionOut(BaseModel):
    PKEY_id: int
    mission_number: str
    status: str
    execution_date: Optional[datetime]
    FKEY_users_TABLE_owner_id: int
    owner: Optional[UserOut] = None
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)

class ListResponse(BaseModel):
    status: int
    message: str
    content: list[MissionOut]
