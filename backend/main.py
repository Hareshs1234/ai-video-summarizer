import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(dotenv_path=".env")

api_key = os.getenv("OPENAI_API_KEY")

print("Key loaded:", api_key is not None)

client = OpenAI(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        
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

    
    
    video_id = request.video_url.split("v=")[1].split("&")[0]

    youtube_api = YouTubeTranscriptApi()

    try:
        transcript = youtube_api.fetch(video_id)

    except Exception:
        return {
            "summary": "Unable to retrieve a transcript for this video. It may not have captions enabled.",
            "key_points": ["Unable to Generate"],
            "transcript": "No transcript available"
        }

    


    youtube_api = YouTubeTranscriptApi()
    transcript = youtube_api.fetch(video_id)

    print(transcript)

    transcript_text = " ".join(
        snippet.text for snippet in transcript
    )

    response = client.responses.create(
        model="gpt-5-nano",
        input=f"""
        Write a concise paragraph (5-8 sentences) summarizing the following YouTube transcript.
        Focus on the main ideas and avoid bullet points.

        Transcript:
        {transcript_text}
        """
    )

    key_points_response = client.responses.create(
        model="gpt-5-nano",
        input=f"""
        Extract exactly 5 concise bullet-point key points from the following YouTube transcript.

        Return ONLY the bullet points.

        Transcript:
        {transcript_text}
        """
    )

    key_points = [
        line.replace("- ", "").strip()
        for line in key_points_response.output_text.split("\n")
        if line.strip().startswith("-")
    ]

    summary = response.output_text

    return {
        "summary": summary,
        "key_points": key_points,
        "transcript": transcript_text
    }