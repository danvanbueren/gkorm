"""Mission routes"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import MissionsTable
from app.util.regex import validate_mission_number

router = APIRouter()

@router.get(
    "/get",
    summary="Get all missions",
    description="""
    Returns all missions as an array.
    """,
    response_description="Returns all missions as an array."
    )
def get_all(db: Session = Depends(get_db)):
    response = db.query(MissionsTable).all()
    return [mission for mission in response]

@router.post(
    "/add",
    summary="Add new mission",
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
    response_description="Returns the created mission number if successful."
    )
def add(
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