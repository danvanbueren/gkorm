import enum

class Ranks(enum.Enum):
    OR1 = "OR-1"
    OR2 = "OR-2"
    OR3 = "OR-3"
    OR4 = "OR-4"
    OR5 = "OR-5"
    OR6 = "OR-6"
    OR7 = "OR-7"
    OR8 = "OR-8"
    OR9 = "OR-9"
    OF1 = "OF-1"
    OF2 = "OF-2"
    OF3 = "OF-3"
    OF4 = "OF-4"
    OF5 = "OF-5"
    OF6 = "OF-6"
    OF7 = "OF-7"
    OF8 = "OF-8"
    OF9 = "OF-9"

class CrewPositions(enum.Enum):
    PILOT = "pilot"
    FLIGHT_ENGINEER = "flight_engineer"
    TACTICAL_DIRECTOR = "tactical_director"
    FIGHTER_ALLOCATOR = "fighter_allocator"
    WEAPONS_CONTROLLER = "weapons_controller"
    FIGHTER_ALLOCATOR_WEAPONS_CONTROLLER = "fighter_allocator_weapons_controller"
    SURVEILLANCE_CONTROLLER = "surveillance_controller"
    PASSIVE_CONTROLLER = "passive_controller"
    SURVEILLANCE_OPERATOR = "surveillance_operator"
    SYSTEM_TECHNICIAN = "system_technician"
    COMMUNICATIONS_TECHNICIAN = "communications_technician"
    RADAR_TECHNICIAN = "radar_technician"
    UNQUALIFIED = "unqualified"
    PASSENGER = "passenger"

class CrewPositionModifiers(enum.Enum):
    EVALUATOR = "evaluator"
    INSTRUCTOR = "instructor"
    LINK = "link"
    BASIC = "basic"

class Units(enum.Enum):
    FLYING_SQUADRON_1 = "flying_squadron_1"
    FLYING_SQUADRON_2 = "flying_squadron_2"
    AIRCREW_TRAINING_SQUADRON = "aircrew_training_squadron"
    UNASSIGNED = "unassigned"

class GlobalPermissions(enum.Enum):
    BASIC = "basic"
    SQUADRON_DIRECTOR_OF_OPERATIONS = "squadron_director_of_operations"
    SQUADRON_COMMANDER = "squadron_commander"
    OPERATIONS_WING_COMMANDER = "operations_wing_commander"
    SYSTEM_ADMINISTRATOR = "system_administrator"

class RiskLevels(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class WorksheetTypes(enum.Enum):
    MISSION_PLANNING_RISK_ASSESSMENT = "mission_planning_risk_assessment"
    DAY_OF_MISSION_RISK_ASSESSMENT = "day_of_mission_risk_assessment"
    PERSONAL_RISK_ASSESSMENT = "personal_risk_assessment"
    PILOT_PROFICIENCY_RISK_ASSESSMENT = "pilot_proficiency_risk_assessment"