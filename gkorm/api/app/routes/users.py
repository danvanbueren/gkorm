"""Users routes"""
from typing import Union

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import UsersTable, CrewPositions, CrewPositionModifiers, Units

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