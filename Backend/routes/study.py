from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from database import supabase
from gemini import ask_gemini
from auth_utils import decode_token

router = APIRouter()

class StudyInput(BaseModel):
    subject: str
    exam_date: str
    topics: str
    hours_per_day: int

@router.post("/generate")
def generate_plan(input: StudyInput, authorization: str = Header(None)):
    try:
        token = authorization.split(" ")[1]
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")

    prompt = f"""Create a detailed day-by-day study plan for a college student.
    Subject: {input.subject}
    Exam Date: {input.exam_date}
    Topics to cover: {input.topics}
    Available hours per day: {input.hours_per_day}
    
    Format the plan clearly with Day 1, Day 2, etc.
    Include specific topics, tasks, and time allocations for each day."""

    plan = ask_gemini(prompt)

    supabase.table("study_plans").insert({
        "user_id": user["user_id"],
        "subject": input.subject,
        "plan": plan
    }).execute()

    return {"plan": plan}

@router.get("/my-plans")
def get_plans(authorization: str = Header(None)):
    try:
        token = authorization.split(" ")[1]
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")

    result = supabase.table("study_plans")\
        .select("*")\
        .eq("user_id", user["user_id"])\
        .order("created_at", desc=True)\
        .execute()
    return {"plans": result.data}