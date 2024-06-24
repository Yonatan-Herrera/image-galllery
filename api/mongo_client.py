import os
from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)
URI = os.environ.get("URI")
SECONDPART = os.environ.get("SECONDPART")
mongo_client = MongoClient(f"{URI}{MONGO_PASSWORD}{SECONDPART}")
