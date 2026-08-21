from fastapi import FastAPI

app = FastAPI(
    title="DocuMind AI",
    description="Document Intelligence API",
    version="1.0.0"
)


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