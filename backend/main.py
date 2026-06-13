from fastapi import FastAPI, Depends, HTTPException
from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


import models
from database import engine, SessionLocal

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173,"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind = engine)


class MatchRequest(BaseModel):
    map_name: str
    kills: int
    deaths: int
    assists: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#"health check"
@app.get("/")
def read_root():
    return {
        "status": "online", "database": "SQLite Connected"}

@app.get("/matches")
def get_all_matches(db: Session = Depends(get_db)):
    all_rows = db.query(models.MatchTable).all()
    return all_rows

@app.post("/matches")
def create_match(request_body: MatchRequest, db: Session = Depends(get_db)):
    new_row = models.MatchTable(
        map_name = request_body.map_name,
        kills = request_body.kills,
        deaths = request_body.deaths,
        assists = request_body.assists
    )

    db.add(new_row)
    db.commit()
    db.refresh(new_row)

    return {"message": "Logged into SQLite hard disk!", "assigned_id": new_row.id}

@app.put("/matches/{match_id}")
def update_match(match_id: int, updated_data: MatchRequest, db: Session = Depends(get_db)):
    db_match = db.query(models.MatchTable).filter(models.MatchTable.id == match_id).first()

    if not db_match:
        raise HTTPException(status_code=404, detail =f"Match #{match_id} does not exist inside the SQL database file.")
    
    db_match.map_name = updated_data.map_name
    db_match.kills = updated_data.kills
    db_match.deaths = updated_data.deaths
    db_match.assists = updated_data.assists

    db.commit()
    return {"message": f"Match #{match_id} modified on hard disk!", "updated_id": db_match.id}

@app.delete("/matches/{match_id}")
def delete_match(match_id: int, db: Session = Depends(get_db)):
    db_match = db.query(models.MatchTable).filter(models.MatchTable.id == match_id).first()

    if not db_match:
        raise HTTPException(status_code=404, detail=f"Match #{match_id} cannot be deleted because it was never tracked.")
    
    db.delete(db_match)
    db.commit()

    return {"message": f"Match #{match_id} successfully deleted from the SQLite file ledger."}