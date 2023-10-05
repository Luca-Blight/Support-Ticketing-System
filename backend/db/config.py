import os

# Database configuration
PG_USER = os.environ.get("PG_USER")
PG_PASSWORD = os.environ.get("PG_PASSWORD")
PG_HOST = os.environ.get("PG_HOST")
PG_PORT = os.environ.get("PG_PORT")
PG_DB = os.environ.get("PG_DB")

POOL_MIN_SIZE = 5
POOL_MAX_SIZE = 10

# Other settings
LOG_LEVEL = "DEBUG"
