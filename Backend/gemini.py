import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def ask_gemini(prompt: str) -> str:
    if not GEMINI_API_KEY or GEMINI_API_KEY == "placeholder":
        return "⚠️ AI features are currently unavailable. The Gemini API key has not been configured yet."
    
    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        return f"⚠️ AI service error: {str(e)}"