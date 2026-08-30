from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from enum import Enum

from database import SessionLocal
from models import Project

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ProjectStatus(str, Enum):
    PLANNING = "Planning"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

class ProjectCreate(BaseModel):
    name: str
    status: ProjectStatus

class ProjectUpdate(BaseModel):
    name: str
    status: ProjectStatus

@app.get("/")
def home():
    return {"message": "BuildTrack API is running!"}

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@app.get("/projects/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if project is None:
        return {"message": "Project not found"}
    
    return project

@app.post("/projects")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(
        name = project.name,
        status = project.status.value
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project

@app.put("/projects/{project_id}")
def update_project(
    project_id: int, 
    project: ProjectUpdate,
    db: Session = Depends(get_db)):

    existing_project = db.query(Project).filter(Project.id == project_id).first()

    if existing_project is None:
        return {"message": "Project not found"}

    existing_project.name = project.name
    existing_project.status = project.status.value

    db.commit()
    db.refresh(existing_project)

    return existing_project

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):

    existing_project = db.query(Project).filter(Project.id == project_id).first()

    if existing_project is None:
        return {"message": "Project is not found"}

    db.delete(existing_project)
    db.commit()

    return {"message": "Project deleted successfully"}

