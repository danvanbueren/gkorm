# ##############################################################################
#  COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                    #
#                                                                              #
#  THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE    #
#  COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN    #
#  ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING,  #
#  OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.    #
# ##############################################################################

# TODO: When deploying production build, remove localhost from origins array

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config_database import engine
from app.database_models import Base
from app.routes import status, users, missions, authentication, member_mission_assignments

app = FastAPI()
Base.metadata.create_all(bind=engine)

# TODO: Change for production
origins = [
    "http://localhost:3000",
    "http://frontend:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status.router, prefix="/status")
app.include_router(missions.router, prefix="/missions")
app.include_router(member_mission_assignments.router, prefix="/missions")
app.include_router(users.router, prefix="/users")
app.include_router(authentication.router, prefix="/auth")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
