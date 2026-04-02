from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from database import supabase
from gemini import ask_gemini
from auth_utils import decode_token

router = APIRouter()

class ChatInput(BaseModel):
    message: str

@router.post("/")
def chat(input: ChatInput, authorization: str = Header(None)):
    try:
        token = authorization.split(" ")[1]
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")

    prompt = f"""You are MILO, an AI study assistant for college students.
    Answer the following academic question clearly and helpfully:
    {input.message}"""

    response = ask_gemini(prompt)

    supabase.table("conversations").insert({
        "user_id": user["user_id"],
        "role": "user",
        "message": input.message
    }).execute()
    supabase.table("conversations").insert({
        "user_id": user["user_id"],
        "role": "assistant",
        "message": response
    }).execute()

    return {"response": response}

@router.get("/history")
def get_history(authorization: str = Header(None)):
    try:
        token = authorization.split(" ")[1]
        user = decode_token(token)
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")

    result = supabase.table("conversations")\
        .select("*")\
        .eq("user_id", user["user_id"])\
        .order("created_at")\
        .execute()
    return {"history": result.data}