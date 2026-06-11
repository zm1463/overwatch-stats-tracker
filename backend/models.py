from sqlalchemy import Column, Integer, String
from database import Base

class MatchTable(Base):
    # This names the physical SQL table inside your database file
    __tablename__ = "matches"

    # Define the strict relational table schema (Our Data Types)
    # primary_key=True + autoincrement=True handles unique ID generation safely without sequence bugs!
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    map_name = Column(String, nullable=False)
    kills = Column(Integer, default=0)
    deaths = Column(Integer, default=0)
    assists = Column(Integer, default=0)