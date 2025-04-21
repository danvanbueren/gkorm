"""Development-only testing."""
from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def list_files():
    return ['good test']
