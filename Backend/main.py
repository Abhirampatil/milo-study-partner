from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, chat, study, resources

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "milo-study-partner.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(chat.router, prefix="/chat")
app.include_router(study.router, prefix="/study")
app.include_router(resources.router, prefix="/resources")

@app.get("/")
def root():
    return {"message": "MILO API running"}