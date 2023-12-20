import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(cwd, "../interfaces/"))
sys.path.append(os.path.join(cwd, "../db_functions/"))

import parking_space_functions as ps_func
from connection import connect_to_db

connect_to_db()
ps_func.check_pss_status()
