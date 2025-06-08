"""Users routes"""
from typing import Union

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.config_database import get_db
from app.database_models import UsersTable, CrewPositions, CrewPositionModifiers, Units

router = APIRouter()

# GET ALL

@router.get(
    "/get",
    summary="Get all users",
    tags=["Users"],
    description="""
    Returns all users as an array.
    """,
    response_description="Returns all users as an array."
    )
def users(db: Session = Depends(get_db)):
    try:
        response = db.query(UsersTable)
        if not response.first():
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No users found'
            }
        return {
            "status": status.HTTP_200_OK,
            "message": 'Users successfully retrieved',
            "content": [user for user in response.all()]
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }

@router.get(
    "/get/{pkey_id}",
    summary="Get user by id",
    tags=["Users"],
    description="""
    Returns the user with the specified id.
    """,
    response_description="Returns the user with the specified id."
    )
def get_user_by_id(pkey_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        return {
            "status": status.HTTP_200_OK,
            "message": 'User successfully retrieved',
            "content": response
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }

@router.post(
    "/add",
    summary="Add new user",
    tags=["Users"],
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

@router.delete(
    "/delete/{pkey_id}",
    summary="Delete user by id",
    tags=["Users"],
    description="""
        Deletes a user from the database based on its id.
        """,
    response_description="Returns status of delete request."
)
def delete_by_id(pkey_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User with pkey_id: ' + str(pkey_id) + ' not found'
            }
        db.delete(response)
        db.commit()
        return {
            "status": status.HTTP_200_OK,
            "message": 'User with pkey_id: ' + str(pkey_id) + ' successfully deleted'
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }