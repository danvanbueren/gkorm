"""Routes for Member Mission Assignment Table"""
from typing import Union
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from app.config_database import get_db
from app.database_models import MissionsTable, MemberMissionAssignmentsTable, UsersTable
from app.database_enums import CrewPositions, CrewPositionModifiers
from app.response_schemas import MissionListResponseSchema, MissionSchema, MemberAssignmentSchema
from app.util.regex import validate_mission_number

router = APIRouter()

@router.post(
    "/add_member",
    summary="Assign member to mission",
    tags=["Mission Assignments"],
    description="""
    Adds a member to a mission by creating a record in `MemberMissionAssignmentsTable`.

    Required:
    - `mission_id`: PKEY of the mission in `MissionsTable`
    - `member_id`: PKEY of the user in `UsersTable`

    Optional:
    - `crew_position_override`: Overrides the member's crew position for this mission
    - `crew_position_modifier_override`: Overrides the member's crew position modifier for this mission
    """,
    response_description="Returns the created assignment if successful."
)
def add_member(
    mission_id: int,
    member_id: int,
    crew_position_override: Union[CrewPositions, None] = None,
    crew_position_modifier_override: Union[CrewPositionModifiers, None] = None,
    db: Session = Depends(get_db),
):
    try:
        # Verify mission exists
        mission = db.query(MissionsTable).filter(MissionsTable.PKEY_id == mission_id).first()
        if not mission:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission not found',
                "content": []
            }

        # Verify user exists
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == member_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found',
                "content": []
            }

        # Prevent duplicate member assignment to the same mission
        existing = (
            db.query(MemberMissionAssignmentsTable)
            .filter(
                MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id == mission_id,
                MemberMissionAssignmentsTable.FKEY_users_TABLE_member_id == member_id,
            )
            .first()
        )
        if existing:
            return {
                "status": status.HTTP_409_CONFLICT,
                "message": "Member already assigned to this mission",
                "content": [],
            }

        # Create assignment
        assignment = MemberMissionAssignmentsTable(
            FKEY_missions_TABLE_parent_id=mission_id,
            FKEY_users_TABLE_member_id=member_id,
            crew_position_override=crew_position_override,
            crew_position_modifier_override=crew_position_modifier_override,
        )

        db.add(assignment)
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
            return {
                "status": status.HTTP_409_CONFLICT,
                "message": "Member already assigned to this mission",
                "content": [],
            }
        db.refresh(assignment)

        return {
            "status": status.HTTP_200_OK,
            "message": 'Member successfully assigned to mission',
            "content": [assignment],
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }

@router.patch(
    "/patch/{mission_id}/member/{member_id}",
    summary="Modularly update user details for specific mission",
    tags=["Mission Assignments"],
    description="""
    Updates a user's properties related to the specified mission.
    """,
    response_description="Returns the updated user.",
)
def patch_mission_specific_user_properties(
    mission_id: int,
    member_id: int,
    crew_position_override: Union[CrewPositions, None] = None,
    crew_position_modifier_override: Union[CrewPositionModifiers, None] = None,
    db: Session = Depends(get_db),
):
    try:
        assignment = (db
            .query(MemberMissionAssignmentsTable)
            .filter(
                MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id == mission_id,
                MemberMissionAssignmentsTable.FKEY_users_TABLE_member_id == member_id,)
            .first())
        if not assignment:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Assignment not found',
                "content": []
            }
        if crew_position_override:
            assignment.crew_position_override = crew_position_override
        if crew_position_modifier_override:
            assignment.crew_position_modifier_override = crew_position_modifier_override
        db.commit()
        db.refresh(assignment)
        return {
            "status": status.HTTP_200_OK,
            "message": 'User properties successfully updated',
            "content": [assignment]
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }

@router.delete(
    "/remove_member",
    summary="Remove member from mission",
    tags=["Mission Assignments"],
    description="""
    Removes assignment of a member to a mission by removing the record in `MemberMissionAssignmentsTable`.

    Required:
    - `mission_id`: PKEY of the mission in `MissionsTable`
    - `member_id`: PKEY of the user in `UsersTable`
    """,
    response_description="Returns the status of the operation."
)
def add_member(
    mission_id: int,
    member_id: int,
    db: Session = Depends(get_db),
):
    try:
        # Verify mission exists
        mission = db.query(MissionsTable).filter(MissionsTable.PKEY_id == mission_id).first()
        if not mission:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission not found',
                "content": []
            }

        # Verify user exists
        user = db.query(UsersTable).filter(UsersTable.PKEY_id == member_id).first()
        if not user:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'User not found',
                "content": []
            }

        # Find existing record
        existing = (
            db.query(MemberMissionAssignmentsTable)
            .filter(
                MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id == mission_id,
                MemberMissionAssignmentsTable.FKEY_users_TABLE_member_id == member_id,
            )
            .first()
        )

        # Delete the record
        if not existing:
            # TODO: remove existing record
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Could not find record of member in mission",
                "content": [],
            }

        db.delete(existing)
        db.commit()

        return {
            "status": status.HTTP_200_OK,
            "message": 'Successfully removed member assignment to mission',
            "content": [existing],
        }
    except Exception as e:
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }
