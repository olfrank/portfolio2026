from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ip_address: str = None
    user_agent: str = None

class ContactSubmissionCreate(BaseModel):
    email: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact")
async def create_contact_submission(input: ContactSubmissionCreate, request: Request):
    try:
        # Get client IP and user agent
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent", "Unknown")
        
        # Create submission object
        submission_dict = input.dict()
        submission_dict["ip_address"] = ip_address
        submission_dict["user_agent"] = user_agent
        submission_obj = ContactSubmission(**submission_dict)
        
        # Save to database
        await db.contact_submissions.insert_one(submission_obj.dict())
        
        logger.info(f"Contact submission received from {submission_obj.email}")
        
        return {
            "success": True,
            "message": "Thank you for reaching out! I'll get back to you soon.",
            "id": submission_obj.id
        }
    except Exception as e:
        logger.error(f"Error saving contact submission: {str(e)}")
        return {
            "success": False,
            "error": "Failed to submit contact form. Please try again."
        }

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find().sort("submitted_at", -1).to_list(1000)
    return [ContactSubmission(**submission) for submission in submissions]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()