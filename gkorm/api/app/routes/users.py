"""Users routes"""
from typing import Union

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import UsersTable, CrewPositions, CrewPositionModifiers, Units

router = APIRouter()

@router.get(
    "/get",
    summary="Get all users",
    description="""
    Returns all users as an array.
    """,
    response_description="Returns all users as an array."
    )
def users(db: Session = Depends(get_db)):
    try:
        response = db.query(UsersTable).all()
        return {
            "status": status.HTTP_200_OK,
            "message": 'Users successfully retrieved',
            "content": [user for user in response]
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }

@router.post(
    "/add",
    summary="Add new user",
    description="""
    Returns the new user, if successful.
    """,
    response_description="Returns the new user, if successful."
    )
def add_user(
        amis_id: int,
        given_name: str,
        family_name: str,
        assigned_unit: Units,
        crew_position: CrewPositions,
        crew_position_modifier: Union[CrewPositionModifiers, None] = None,
        db: Session = Depends(get_db)
):
    try:
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
        return {
            "status": status.HTTP_200_OK,
            "message": 'User successfully added',
            "content": new_user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }