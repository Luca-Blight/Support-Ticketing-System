from models.models import User, Ticket
from main import async_engine
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
import bcrypt


async def main():
    # Create tables
    async with async_engine.begin() as conn:
        await conn.run_sync(User.metadata.create_all)
        await conn.run_sync(Ticket.metadata.create_all)

    # Hash the password
    password = "admin"
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

    # Create sample user record
    user = User(
        email="admin@gmail.com",
        password=hashed_password,
        is_active=True,
        is_staff=True,
        firstName="Billy",
        lastName="Joel",
    )

    # Create sample ticket records
    ticket1 = Ticket(
        firstName="John",
        lastName="Doe",
        email="john.doe@example.com",
        description="Issue with headaches and heart burn.",
        status="new",
        priority="medium"
    )

    ticket2 = Ticket(
        firstName="Jane",
        lastName="Smith",
        email="jane.smith@example.com",
        description="Dizziness since last week.",
        status="in progress",
        priority="high"
    )

    ticket3 = Ticket(
        firstName="Alice",
        lastName="Johnson",
        email="alice.johnson@example.com",
        description="Back pain and huge delay in prescription.",
        status="resolved",
        priority="low"
    )

    async_session = sessionmaker(
        bind=async_engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        session.add(user)
        session.add_all([ticket1, ticket2, ticket3])  
        await session.commit()


# Run the script
import asyncio

asyncio.run(main())
