from fastapi import APIRouter

router = APIRouter(
    tags=["Health"],
    responses={404: {"description": "Not found"}},
)

@router.get("/health")
async def health_check():
    return {"status": "ok"}