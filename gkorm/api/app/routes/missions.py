"""Mission routes"""
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

@router.get(
    "/get",
    response_model=MissionListResponseSchema,
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

        # Preload all member assignments + users for these missions
        mission_ids = [m.PKEY_id for m in response]
        assignments_by_mission: dict[int, list[MemberAssignmentSchema]] = {}
        if mission_ids:
            rows = (
                db.query(MemberMissionAssignmentsTable, UsersTable)
                .join(
                    UsersTable,
                    MemberMissionAssignmentsTable.FKEY_users_TABLE_member_id == UsersTable.PKEY_id,
                )
                .filter(MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id.in_(mission_ids))
                .all()
            )

            for assignment, user in rows:
                mission_id = assignment.FKEY_missions_TABLE_parent_id
                assignments_by_mission.setdefault(mission_id, []).append(
                    MemberAssignmentSchema(
                        PKEY_id=assignment.PKEY_id,
                        FKEY_missions_TABLE_parent_id=assignment.FKEY_missions_TABLE_parent_id,
                        FKEY_users_TABLE_member_id=assignment.FKEY_users_TABLE_member_id,
                        crew_position_override=assignment.crew_position_override,
                        crew_position_modifier_override=assignment.crew_position_modifier_override,
                        user=user,
                    )
                )

        # TODO: NEED ACTUAL STATUS!
        content = []
        for m in response:
            content.append(
                MissionSchema(
                    PKEY_id=m.PKEY_id,
                    mission_number=m.mission_number,
                    status="(api todo)",
                    execution_date=m.execution_date,
                    FKEY_users_TABLE_owner_id=m.FKEY_users_TABLE_owner_id,
                    owner=m.owner,
                    members=assignments_by_mission.get(m.PKEY_id, []),
                )
            )
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
        response = (
            db.query(MissionsTable)
            .options(joinedload(MissionsTable.owner))
            .filter(MissionsTable.PKEY_id == pkey_id)
            .first()
        )

        if not response:
            return {
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'Mission not found',
                "content": []
            }

        # Load member assignments with user info for this mission
        rows = (
            db.query(MemberMissionAssignmentsTable, UsersTable)
            .join(
                UsersTable,
                MemberMissionAssignmentsTable.FKEY_users_TABLE_member_id == UsersTable.PKEY_id,
            )
            .filter(MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id == pkey_id)
            .all()
        )

        members = [
            MemberAssignmentSchema(
                PKEY_id=assignment.PKEY_id,
                FKEY_missions_TABLE_parent_id=assignment.FKEY_missions_TABLE_parent_id,
                FKEY_users_TABLE_member_id=assignment.FKEY_users_TABLE_member_id,
                crew_position_override=assignment.crew_position_override,
                crew_position_modifier_override=assignment.crew_position_modifier_override,
                user=user,
            )
            for assignment, user in rows
        ]

        content = MissionSchema(
            PKEY_id=response.PKEY_id,
            mission_number=response.mission_number,
            status="(api todo)",
            execution_date=response.execution_date,
            FKEY_users_TABLE_owner_id=response.FKEY_users_TABLE_owner_id,
            owner=response.owner,
            members=members,
        )


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

@router.get(
    '/get/{pkey_id}/status',
    summary="Get mission status by id",
    tags=["Missions"],
    description="""
    Returns each category of mission status by the specified id.
    """,
    response_description="Returns each category of mission status by the specified id."
)
def get_status_by_id(pkey_id: int, db: Session = Depends(get_db)):
    try:
        response = db.query(MissionsTable).filter(MissionsTable.PKEY_id == pkey_id).first()

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

@router.post(
    "/add_member",
    summary="Assign member to mission",
    tags=["Missions"],
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

        # Remove dependent member assignments to satisfy FK constraints
        db.query(MemberMissionAssignmentsTable).\
            filter(MemberMissionAssignmentsTable.FKEY_missions_TABLE_parent_id == pkey_id).\
            delete(synchronize_session=False)

        # Delete the mission
        db.delete(response)
        db.commit()
        return {
            "status": status.HTTP_200_OK,
            "message": 'Mission with pkey_id: ' + str(pkey_id) + ' successfully deleted',
            "content": []
        }
    except Exception as e:
        db.rollback()
        return {
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": str(e),
            "content": []
        }
