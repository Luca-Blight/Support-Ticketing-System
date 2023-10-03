
import secrets


from fastapi import APIRouter,HTTPException, Depends, status 
from fastapi.security import HTTPBasic, HTTPBasicCredentials


from sqlalchemy.orm import sessionmaker, Session
from backend.db.models.models import *
from backend.db.main import *


SessionLocal = sessionmaker(bind=engine)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@app.post("/tickets/")
async def create_ticket(ticket: Ticket, db: Session = Depends(get_db)):
    db_ticket = Ticket(**ticket.dict())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@app.get("/tickets/")
async def list_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).all()

@app.get("/tickets/{ticket_id}")
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.put("/tickets/{ticket_id}")
async def update_ticket(ticket_id: int, ticket_update: Ticket, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    for key, value in ticket_update.dict().items():
        setattr(ticket, key, value)
    db.commit()
    return ticket



security = HTTPBasic()

users_db = {"admin": "password"}  # Simple username-password mapping for demonstration

@router.post("/login/")
def login(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "admin")
    correct_password = secrets.compare_digest(credentials.password, "password")
    
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return {"status": "Logged in successfully!"}