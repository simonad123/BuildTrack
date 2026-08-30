from sqlalchemy import Column, Integer, String
from database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)