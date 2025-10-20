# ##############################################################################
#  COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                    #
#                                                                              #
#  THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE    #
#  COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN    #
#  ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING,  #
#  OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.    #
# ##############################################################################

import re

from fastapi import HTTPException


def validate_mission_number(mission_number: str) -> str:
    # Convert to uppercase
    mission_number = mission_number.upper()

    # Pattern: 2 letters, 4 numbers, 1 optional letter
    pattern = r'^[A-Z]{2}\d{4}[A-Z]?$'

    if not re.match(pattern, mission_number):
        raise HTTPException(
            status_code=400,
            detail="Mission number must be in format LLNNNNX where L is a letter, N is a number, and X is an optional letter"
        )

    return mission_number
