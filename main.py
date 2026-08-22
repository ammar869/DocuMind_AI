from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.health import router as health_router
from api.routes.documents import router as documents_router
from api.routes.chat import router as chat_router

app = FastAPI(
    title="DocuMind AI",
    description="Document Intelligence API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(documents_router, prefix="/api")
app.include_router(chat_router, prefix="/api")