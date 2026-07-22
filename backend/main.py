import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supadata import Supadata, SupadataError
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(dotenv_path=".env")

api_key = os.getenv("OPENAI_API_KEY")
supadata_api_key = os.getenv("SUPADATA_API_KEY")

print("OpenAI key loaded:", api_key is not None)
print("Supadata key loaded:", supadata_api_key is not None)

client = OpenAI(api_key=api_key)
supadata = Supadata(api_key=supadata_api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5176",
        "https://ai-video-summarizer-hy2b.vercel.app",

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
        transcript = supadata.transcript(
            url=request.video_url,
            text=True,
            mode="auto"
        )

        transcript_text = transcript.content

    except SupadataError as error:
        print("SUPADATA ERROR:", error)

        return {
            "summary": "Unable to retrieve a transcript for this video.",
            "key_points": ["Unable to Generate"],
            "transcript": "No transcript available"
        }

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