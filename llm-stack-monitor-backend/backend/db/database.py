from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine

from db.base import Base  # your declarative base
from models import *      # ensures all models are registered

DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/llmtrace"
SYNC_DATABASE_URL = "postgresql://postgres:password@localhost:5432/llmtrace"

# Async engine and session
async_engine = create_async_engine(DATABASE_URL, echo=True, future=True)
async_sessionmaker = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Sync engine and session
sync_engine = create_engine(SYNC_DATABASE_URL, echo=True, future=True)
sync_sessionmaker = sessionmaker(
    bind=sync_engine,
    class_=Session,
    expire_on_commit=False
)

# Async: initialize database
async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Dependency: async session
async def get_async_session():
    async with async_sessionmaker() as session:
        yield session

# Dependency: sync session
def get_sync_session():
    with sync_sessionmaker() as session:
        yield session
