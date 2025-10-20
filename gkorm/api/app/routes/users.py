# ##############################################################################
#  COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                    #
#                                                                              #
#  THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE    #
#  COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN    #
#  ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING,  #
#  OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.    #
# ##############################################################################

from typing import Union

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.config_database import get_db
from app.database_enums import Ranks, CrewPositions, CrewPositionModifiers, Units
from app.database_models import UsersTable

router = APIRouter()


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
        rank: Union[Ranks, None] = None,
        given_name: Union[str, None] = None,
        family_name: Union[str, None] = None,
        assigned_unit: Union[Units, None] = None,
        crew_position: Union[CrewPositions, None] = None,
        crew_position_modifier: Union[CrewPositionModifiers, None] = None,
        db: Session = Depends(get_db)
):
    try:
        new_user = UsersTable(
            amis_id=amis_id,
            rank=rank,
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


@router.patch(
    "/update/rank/{pkey_id}",
    summary="Update user's rank",
    tags=["Users"],
    description="""
    Updates a user's rank.
    """,
    response_description="Returns the updated user.",
)
def update_given_name(
        pkey_id: int,
        rank: Union[Ranks, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found',
                "content": []
            }

        if not rank:
            return {
                "status": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "message": 'Payload is empty',
                "content": []
            }

        user.rank = rank
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User rank successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }


@router.patch(
    "/update/given_name/{pkey_id}",
    summary="Update user's given name",
    tags=["Users"],
    description="""
    Updates a user's given name.
    """,
    response_description="Returns the updated user.",
)
def update_given_name(
        pkey_id: int,
        given_name: Union[str, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found',
                "content": []
            }

        if not given_name:
            return {
                "status": status.HTTP_422_UNPROCESSABLE_ENTITY,
                "message": 'Payload is empty',
                "content": []
            }

        user.given_name = given_name
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User given name successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }


@router.patch(
    "/update/family_name/{pkey_id}",
    summary="Update user's family name",
    tags=["Users"],
    description="""
    Updates a user's family name.
    """,
    response_description="Returns the updated user.",
)
def update_family_name(
        pkey_id: int,
        family_name: Union[str, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        user.family_name = family_name
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User family name successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }


@router.patch(
    "/update/crew_position/{pkey_id}",
    summary="Update user's crew position",
    tags=["Users"],
    description="""
    Updates a user's crew position.
    """,
    response_description="Returns the updated user.",
)
def update_crew_position(
        pkey_id: int,
        crew_position: Union[CrewPositions, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        user.crew_position = crew_position
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User crew position successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }


@router.patch(
    "/update/crew_position_modifier/{pkey_id}",
    summary="Update user's crew position modifier",
    tags=["Users"],
    description="""
    Updates a user's crew position modifier.
    """,
    response_description="Returns the updated user.",
)
def update_crew_position_modifier(
        pkey_id: int,
        crew_position_modifier: Union[CrewPositionModifiers, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        user.crew_position_modifier = crew_position_modifier
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User crew position modifier successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }


@router.patch(
    "/update/assigned_unit/{pkey_id}",
    summary="Update user's assigned unit",
    tags=["Users"],
    description="""
    Updates a user's assigned unit.
    """,
    response_description="Returns the updated user.",
)
def update_assigned_unit(
        pkey_id: int,
        assigned_unit: Union[Units, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        user.assigned_unit = assigned_unit
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User assigned unit successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }


@router.patch(
    "/patch/{pkey_id}",
    summary="Modularly update user details",
    tags=["Users"],
    description="""
    Updates a user's properties.
    """,
    response_description="Returns the updated user.",
)
def patch_user_properties(
        pkey_id: int,
        rank: Union[Ranks, None] = None,
        given_name: Union[str, None] = None,
        family_name: Union[str, None] = None,
        crew_position: Union[CrewPositions, None] = None,
        crew_position_modifier: Union[CrewPositionModifiers, None] = None,
        assigned_unit: Union[Units, None] = None,
        db: Session = Depends(get_db),
):
    try:
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == pkey_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found'
            }
        if rank:
            user.rank = rank
        if given_name:
            user.given_name = given_name
        if family_name:
            user.family_name = family_name
        if crew_position:
            user.crew_position = crew_position
        if crew_position_modifier:
            user.crew_position_modifier = crew_position_modifier
        if assigned_unit:
            user.assigned_unit = assigned_unit
        db.commit()
        db.refresh(user)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User properties successfully updated',
            "content": user
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e)
        }


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


@router.get(
    "/get/amis/{amis_id}",
    summary="Get user by amis id",
    tags=["Users"],
    description="""
    Returns the user with the specified amis id.
    """,
    response_description="Returns the user with the specified amis id."
)
def get_user_by_amis_id(amis_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(UsersTable).filter(UsersTable.amis_id == amis_id).first()
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
