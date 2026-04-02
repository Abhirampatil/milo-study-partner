from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import supabase
from auth_utils import hash_password, verify_password, create_token

router = APIRouter()

class UserInput(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: UserInput):
    existing = supabase.table("users").select("*").eq("username", user.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = hash_password(user.password)
    supabase.table("users").insert({"username": user.username, "password": hashed}).execute()
    return {"message": "User created successfully"}

@router.post("/login")
def login(user: UserInput):
    result = supabase.table("users").select("*").eq("username", user.username).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    db_user = result.data[0]
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_token({"user_id": db_user["id"], "username": db_user["username"]})
    return {"token": token, "username": db_user["username"]}