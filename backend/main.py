from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VideoRequest(BaseModel):
    video_url: str


@app.get("/")
def home():
    return {"message": "Backend is working!"}


@app.post("/generate-notes")
def generate_notes(request: VideoRequest):
    return {
        "summary": f"Received this video: {request.video_url}",
        "key_points": [
            "First key point",
            "Second key point",
            "Third key point"
        ],
        "transcript": "The transcript will appear here later."
    }