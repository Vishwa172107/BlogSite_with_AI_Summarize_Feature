from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained BART model for summarization
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class TextModel(BaseModel):
    text: str

@app.get("/")
def send_hello():
    return {"message": "Hello, World!"}

@app.post("/post/text-summary")
async def read_text_summary(data: TextModel):
    text = data.text
    summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
    return {"text": text, "summary": summary[0]["summary_text"]}
