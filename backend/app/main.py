from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import codegen

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(codegen.router, prefix="/api/v1/codegen", tags=["Code Generation"])


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)