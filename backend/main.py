import os
from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["db_user"]

@app.get("/")
def read_root():
    return {"status": "Connected to MongoDB via Python!"}