"""Mission routes"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session, joinedload
from app.config_database import get_db
from app.database_models import MissionsTable
from app.response_schemas import ListResponse, MissionOut
from app.util.regex import validate_mission_number

router = APIRouter()

@router.get(
    "/get",
    response_model=ListResponse,
    summary="Get all missions",
    tags=["Missions"],
    description="""
    Returns all missions as an array.
    """,
    response_description="Returns all missions as an array."
    )
def get_all(db: Session = Depends(get_db)):
    try:
        response = db.query(MissionsTable).options(joinedload(MissionsTable.owner)).all()
        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No missions found',
                "content": []
            }
        # TODO: Get actual status and date. Temporarily attach "unknown" for now
        content = [
            MissionOut(
                PKEY_id=m.PKEY_id,
                mission_number=m.mission_number,
                status="(api todo)",
                execution_date=m.execution_date,
                FKEY_users_TABLE_owner_id=m.FKEY_users_TABLE_owner_id,
                owner=m.owner,
            ) for m in response
        ]
        return {
            "status": status.HTTP_200_OK,
            "message": 'Missions successfully retrieved',
            "content": content,
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }

@router.get(
    "/get/{pkey_id}",
    summary="Get mission by id",
    tags=["Missions"],
    description="""
    Returns the mission with the specified id.
    """,
    response_description="Returns the mission with the specified id."
    )
def get_by_id(pkey_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(MissionsTable).filter(MissionsTable.PKEY_id == pkey_id).first()
        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission not found',
                "content": []
            }
        return {
            "status": status.HTTP_200_OK,
            "message": 'Mission successfully retrieved',
            "content": response
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }

@router.post(
    "/add",
    summary="Add new mission",
    tags=["Missions"],
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
        db: Session = Depends(get_db)
):
    try:
        formatted_mission_number = validate_mission_number(mission_number)
        new_mission = MissionsTable(
            mission_number=formatted_mission_number,
            FKEY_users_TABLE_owner_id=owner_id
        )
        db.add(new_mission)
        db.commit()
        db.refresh(new_mission)
        return {
            "status": status.HTTP_200_OK,
            "message": 'Mission successfully added',
            "content": new_mission
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }

@router.delete(
    "/delete/{pkey_id}",
    summary="Delete mission by id",
    tags=["Missions"],
    description="""
        Deletes a mission from the database based on its id.
        """,
    response_description="Returns status of delete request."
)
def delete_by_id(pkey_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(MissionsTable).filter(MissionsTable.PKEY_id == pkey_id).first()
        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission with pkey_id: ' + str(pkey_id) + ' not found',
                "content": []
            }
        db.delete(response)
        db.commit()
        return {
            "status": status.HTTP_200_OK,
            "message": 'Mission with pkey_id: ' + str(pkey_id) + ' successfully deleted',
            "content": []
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }
