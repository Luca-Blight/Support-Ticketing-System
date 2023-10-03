from sqlalchemy import create_engine
from db.config import (
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_NAME,
    POOL_MIN_SIZE,
    POOL_MAX_SIZE,
)
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

load_dotenv()



ASYNC_PG_URL = (
    f"postgresql+asyncpg://{PG_USER}:{PG_PASSWORD}@{PG_HOST}:{PG_PORT}/{PG_NAME}"
)

async_engine = create_async_engine(
    ASYNC_PG_URL, echo=True, pool_size=POOL_MIN_SIZE, max_overflow=POOL_MAX_SIZE
)
