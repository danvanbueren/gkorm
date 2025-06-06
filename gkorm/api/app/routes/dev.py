"""Development-only testing."""
from typing import Union

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import MissionsTable, UsersTable, CrewPositions, CrewPositionModifiers, Units
from app.util.regex import validate_mission_number

router = APIRouter()

@router.get("/users")
def users(db: Session = Depends(get_db)):
    response = db.query(UsersTable).all()
    return [user for user in response]

@router.post("/add_user")
def add_user(
        amis_id: int,
        given_name: str,
        family_name: str,
        assigned_unit: Units,
        crew_position: CrewPositions,
        crew_position_modifier: Union[CrewPositionModifiers, None] = None,
        db: Session = Depends(get_db)
):
    new_user = UsersTable(
        amis_id=amis_id,
        given_name=given_name,
        family_name=family_name,
        crew_position=crew_position,
        crew_position_modifier=crew_position_modifier,
        assigned_unit=assigned_unit
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"new_user": new_user}

@router.get("/missions")
def missions(db: Session = Depends(get_db)):
    response = db.query(MissionsTable).all()
    return [mission for mission in response]

@router.post(
    "/add_mission",
    summary="Add a new mission",
    description="""
    Add a new mission to the `MissionsTable` in the database.

    The mission number must follow the format: LLNNNNX
    - L: Required letter (A-Z)
    - N: Required number (0-9)
    - X: Optional letter (A-Z)

    Examples:
    - AJ1234
    - AJ5678M

    All letters will be automatically converted to uppercase.
    """,
    response_description="Returns the created mission number if successful"
    )
def add_mission(
        owner_id: int,
        mission_number: str = Depends(validate_mission_number),
        db: Session = Depends(get_db)):
    formatted_mission_number = validate_mission_number(mission_number)
    new_mission = MissionsTable(
        mission_number=formatted_mission_number,
        FKEY_users_TABLE_owner_id=owner_id
    )
    db.add(new_mission)
    db.commit()
    db.refresh(new_mission)
    return {"new_mission": new_mission}
