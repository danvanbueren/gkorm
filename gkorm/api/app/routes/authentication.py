"""Authentication routes"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.config_database import get_db
from app.database_models import (
    UsersTable,
    Units,
    CrewPositions,
    CrewPositionModifiers
)

router = APIRouter()

@router.get(
    "/no_crypto/{amis_id}",
    summary="Get or create user by amis id",
    tags=["Authentication"],
    description="""
    Returns the user with the specified amis id, or creates one if it doesn't exist.
    """,
    response_description="Returns the user with the specified amis id, or creates one if it doesn't exist.",
)
def get_or_create_user_by_amis_id(amis_id: int, db: Session = Depends(get_db)):
    try:
        user = db.query(UsersTable).filter(UsersTable.amis_id == amis_id).first()
        if user:
            return {
                "status": status.HTTP_200_OK,
                "message": "User successfully retrieved",
                "content": user,
            }

        new_user = UsersTable(
            amis_id=amis_id
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {
            "status": status.HTTP_200_OK,
            "message": "User successfully added",
            "content": new_user,
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
        }