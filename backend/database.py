from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Define the local hard-drive file destination link
SQLALCHEMY_DATABASE_URL = "sqlite:///./overwatch_stats.db"

#communication engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # This is unique to SQLite; allows async workers to view the file safely
)

#opens a temporary connection session window
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create a Base routing class. Our actual relational structures will inherit from this
Base = declarative_base()