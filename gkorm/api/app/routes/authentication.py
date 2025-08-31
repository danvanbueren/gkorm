"""Authentication routes"""
from typing import Union

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import UsersTable, CrewPositions, CrewPositionModifiers, Units

router = APIRouter()

@router.get(
    "/no_crypto/{amis_id}",
    summary="Get or create user by amis id",
    tags=["Authentication"],
    description="""
    Returns the user with the specified amis id, or creates one if it doesn't exist.
    """,
    response_description="Returns the user with the specified amis id, or creates one if it doesn't exist."
    )
def get_or_create_user_by_amis_id(amis_id: int, db: Session = Depends(get_db)):
    try:
        # First attempt to find the user
        response = db.query(UsersTable).filter(UsersTable.amis_id == amis_id).first()

        if response:
            return {
                "status": status.HTTP_200_OK,
                "message": 'User successfully retrieved',
                "content": response
            }

        # If the user doesn't exist, create a new one with default values

        try:
            new_user = UsersTable(
                amis_id=amis_id,
                crew_position=CrewPositions.UNQUALIFIED,
                crew_position_modifier=CrewPositionModifiers.BASIC,
                assigned_unit=Units.UNASSIGNED
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
                "message": 'User not found. Error when creating new user: ' + str(e)
            }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }