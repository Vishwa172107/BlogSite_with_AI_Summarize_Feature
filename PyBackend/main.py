from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Summarizer import TextSummarizer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class text_model(BaseModel):
    text: str

@app.get("/")
def send_hello():
    return {"message": "Hello, World!"}

@app.post("/post/text-summary")
async def read_text_summary(data: text_model):
    print(data)
    text = data.text
    summarizer = TextSummarizer()
    summary = summarizer.summarize(text=text)
    return { "text" : text,
            "summary": summary }
