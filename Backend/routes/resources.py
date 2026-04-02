from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from database import supabase
from gemini import ask_gemini
from auth_utils import decode_token

router = APIRouter()

class ResourceInput(BaseModel):
    topic: str

@router.post("/recommend")
def recommend(input: ResourceInput, authorization: str = Header(None)):
    try:
        token = authorization.split(" ")[1]
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")

    prompt = f"""Recommend the best learning resources for a college student studying: {input.topic}
    
    Include:
    - 3 YouTube channels or videos
    - 3 websites or documentation links
    - 2 books or textbooks
    - 2 practice/quiz platforms
    
    Be specific with names and explain why each is useful."""

    content = ask_gemini(prompt)

    supabase.table("resources").insert({
        "user_id": user["user_id"],
        "topic": input.topic,
        "content": content
    }).execute()

    return {"resources": content}