from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from pydantic import BaseModel


from backend.db.models.models import *
from backend.db.main import *
from passlib.context import CryptContext

import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


AsyncSessionLocal = sessionmaker(bind=async_engine, class_=AsyncSession)

class TicketUpdate(BaseModel):
    status: Optional[str]
    priority: Optional[str] 


async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()


router = APIRouter()


@router.post("/tickets/")
async def create_ticket(ticket: Ticket, db: AsyncSession = Depends(get_db)):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    
    await db.commit()

    return db_ticket


@router.get("/tickets/")
async def list_tickets(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Ticket))

    all_tickets = result.all()
    tickets_list = [ticket[0].__dict__ for ticket in all_tickets]
    
    for ticket_dict in tickets_list:
        ticket_dict.pop("_sa_instance_state", None)
        
    return tickets_list


@router.get("/tickets/{ticket_id}")
async def get_ticket(ticket_id: int, db: AsyncSession = Depends(get_db)):
    ticket = await db.execute(
        select(Ticket).filter(Ticket.id == ticket_id)
    ).scalar_one_or_none()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.put("/tickets/{ticket_id}")
async def update_ticket(
    ticket_id: int, 
    ticket_update: TicketUpdate,  
    db: AsyncSession = Depends(get_db)
):

    ticket_instance = await db.execute(
        select(Ticket).filter(Ticket.id == ticket_id)
    )
    
    ticket = ticket_instance.scalar_one_or_none()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if ticket_update.status:

        ticket.status = ticket_update.status

    if ticket_update.priority:  
        
        ticket.priority = ticket_update.priority
        
    
    await db.commit()

    return {"status": "Ticket updated!"}


security = HTTPBasic()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login/")
async def login(
    credentials: HTTPBasicCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).filter(User.email == credentials.username))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email",
            headers={"WWW-Authenticate": "Basic"},
        )

    if not pwd_context.verify(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Basic"},
        )

    if not user.is_staff:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough privileges",
        )

    return {"status": "Logged in successfully!"}
