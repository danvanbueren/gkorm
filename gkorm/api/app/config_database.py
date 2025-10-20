# ##############################################################################
#  COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                    #
#                                                                              #
#  THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE    #
#  COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN    #
#  ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING,  #
#  OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.    #
# ##############################################################################

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

USERNAME = 'username'
PASSWORD = 'password'
HOST = 'database'
PORT = 5432
DATABASE = 'gkorm'
URL = f'postgresql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'

engine = create_engine(URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
