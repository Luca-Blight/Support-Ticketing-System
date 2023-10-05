from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from uvicorn import run


app = FastAPI(debug=True)

app.include_router(router)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://ed20659bca65.ngrok.app"
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
