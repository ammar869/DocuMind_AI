from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import chat_router, documents_router, health_router

app = FastAPI(
    title="DocuMind AI",
    description="Document Intelligence API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(documents_router, prefix="/api")
app.include_router(chat_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "DocuMind AI API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
