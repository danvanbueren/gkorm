from fastapi import APIRouter, Depends, status
from sqlalchemy import literal
from sqlalchemy.orm import Session

from app.config_database import get_db

router = APIRouter()
@router.get(
    "/baseline",
    summary="Get baseline health check",
    tags=["Status"],
    description="""
    Returns current status of FastAPI.
    """,
    response_description="Returns current status of FastAPI."
    )
def get_baseline_status():
    return {
        "status": status.HTTP_200_OK,
        "message": 'FastAPI is ready for use'
    }

@router.get(
    "/database",
    summary="Get status of database",
    tags=["Status"],
    description="""
    Returns current status of database.
    """,
    response_description="Returns current status of database."
    )
def get_database_status(db: Session = Depends(get_db)):
    try:
        if not db.is_active:
            return {
                "status": status.HTTP_503_SERVICE_UNAVAILABLE,
                "message": 'Database is not active'
            }
        db.query(literal('SELECT 1')).first()
        return {
            "status": status.HTTP_200_OK,
            "message": 'Database is ready for use'
        }
    except Exception as e:
        return {
            "status": status.HTTP_503_SERVICE_UNAVAILABLE,
            "message": str(e)
        }

@router.get(
    '/mission/{mission_id}',
    summary="Get mission status by id",
    tags=["Status"],
    description="""
    Returns each category of mission status by the specified id.
    """,
    response_description="Returns each category of mission status by the specified id."
)
def get_mission_status_by_id(mission_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(MissionsTable).filter(MissionsTable.PKEY_id == mission_id).first()

        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission not found',
                "content": []
            }

        # TODO: NEED ACTUAL STATUS!
        content = {
            'OVERALL_MISSION_STATUS': 'UNKNOWN',
            'MISSION_PLANNING_WORKSHEET_STATUS': 'COMPLETE',
            'PILOT_PROFICIENCY_WORKSHEET_STATUS': 'IN_PROGRESS',
            'DAY_OF_MISSION_WORKSHEET_STATUS': 'NOT_STARTED',
            'PERSONAL_WORKSHEET_STATUS': 'UNKNOWN',
        }

        return {
            "status": status.HTTP_200_OK,
            "message": 'Mission successfully retrieved',
            "content": content
        }

    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }
