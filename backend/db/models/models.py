from sqlmodel import Field, SQLModel
from typing import Optional
from datetime import datetime
class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(primary_key=True)
    firstName: str
    lastName: str
    email: str = Field(unique=True, index=True)
    password: str
    is_active: bool = True
    is_staff: bool = True


class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True)
    firstName: str
    lastName: str
    email: str = Field(index=True)
    description: str
    status: str = "new"
    priority: Optional[str] = "low"
    date: Optional[datetime] = datetime.now()
