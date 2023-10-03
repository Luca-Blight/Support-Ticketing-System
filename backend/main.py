from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run


app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    run("main:app", host="0.0.0.0", port=8000, reload=True)