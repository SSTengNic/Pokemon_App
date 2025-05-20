from fastapi import APIRouter, Depends, UploadFile, Form, File
from sqlmodel import Session, select

from models.models import Note
from db import get_session

router = APIRouter()


@router.post("/upload") # Defines a POST endpoint at /upload
async def upload_note(title: str = Form(...), image: UploadFile = File(...),session: Session = Depends(get_session)):

    print("Receiving!")

    note = Note(title= title, image_url = image.filename)
    session.add(note)
    session.commit()
    session.refresh(note)
    return note


@router.get("/notes/")
def get_notes(session: Session = Depends(get_session)):
    return session.exec(select(Note)).all()


