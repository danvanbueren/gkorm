from fastapi import APIRouter, Depends, status
from sqlalchemy import literal
from sqlalchemy.orm import Session

from app.config_database import get_db

router = APIRouter()

@router.get("/baseline")
def baseline():
    return {
        "status": status.HTTP_200_OK,
        "message": 'FastAPI is ready for use'
    }

@router.get("/database")
def database(db: Session = Depends(get_db)):
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