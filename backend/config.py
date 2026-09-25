import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ReMargin Backend API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./remargin.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "remargin-secret-key-change-in-production")
    
    class Config:
        case_sensitive = True

settings = Settings()
