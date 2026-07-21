import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi


load_dotenv()

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
    try:
        video_id = request.video_url.split("v=")[1].split("&")[0]
    except IndexError:
        return {
            "summary": "Please enter a valid YouTube URL.",
            "key_points": ["Unable to Generate"],
            "transcript": "No transcript available",
        }

    try:
        youtube_api = YouTubeTranscriptApi()
        transcript = youtube_api.fetch(video_id)

    except Exception as error:
        print("TRANSCRIPT ERROR:", repr(error))

        return {
            "summary": (
                "Unable to retrieve a transcript for this video. "
                "It may not have captions enabled."
            ),
            "key_points": ["Unable to Generate"],
            "transcript": "No transcript available",
        }

    transcript_text = " ".join(
        snippet.text for snippet in transcript
    )

    try:
        summary_response = client.responses.create(
            model="gpt-5-nano",
            input=f"""
Write a concise paragraph of 5 to 8 sentences summarizing the following
YouTube transcript.

Focus on the main ideas and do not use bullet points.

Transcript:
{transcript_text}
""",
        )

        key_points_response = client.responses.create(
            model="gpt-5-nano",
            input=f"""
Extract exactly 5 concise key points from the following YouTube transcript.

Return only bullet points, with each line starting with a dash.

Transcript:
{transcript_text}
""",
        )

    except Exception as error:
        print("OPENAI ERROR:", repr(error))

        return {
            "summary": "Unable to generate notes right now.",
            "key_points": ["Unable to Generate"],
            "transcript": transcript_text,
        }

    key_points = [
        line.removeprefix("-").strip()
        for line in key_points_response.output_text.splitlines()
        if line.strip().startswith("-")
    ]

    return {
        "summary": summary_response.output_text,
        "key_points": key_points,
        "transcript": transcript_text,
    }