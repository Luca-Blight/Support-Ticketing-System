from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int = Field(primary_key=True)
    firstName: str 
    lastName: str
    email: str = Field(unique=True, index=True)
    password: str  
    is_active: bool = True  
    is_staff: bool = True

    


class Ticket(SQLModel, table=True):
    id: int = Field(primary_key=True)
    name: str
    email: str = Field(index=True)
    description: str
    status: str = "new"



