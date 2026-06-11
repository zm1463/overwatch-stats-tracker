# Overwatch Stats Tracker
A full-stack web app designed to log and track some player match statistics in a video game called Overwatch

## Tech Stack:
Backend - Python (FastAPI and Flask), SQLAlcehmy, SQLite
Frontend - React, Vite

## Architecture Blueprint:
The backend is split up into three main files to loosen the coupling between these modules

* **'database.py'**: This creates the local database file and connects it to the program
* **'models.py':** This defines how the data is stored in the tables, through defining the data types in each column
* **'main.py'**: This is where the code exists to mutate data by the user, this routes the API traffic