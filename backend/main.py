from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings

# Import routers for all 13 pipeline stages
from backend.routers import (
    factory_setup,
    upload_data,
    data_extraction,
    energy_estimation,
    energy_reconciliation,
    confidence_score,
    cost_calculation,
    carbon_calculation,
    scrap_analysis,
    trend_analysis,
    recommendations,
    report_generation,
    dashboard,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="ReMargin 13-Stage Backend Architecture API",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "ReMargin Backend Engine",
        "version": settings.VERSION,
        "stages": 13,
    }

# Register Routers for all 13 Pipeline Stages
app.include_router(factory_setup.router, prefix=f"{settings.API_V1_STR}/factory", tags=["1. Factory Setup"])
app.include_router(upload_data.router, prefix=f"{settings.API_V1_STR}/upload", tags=["2. Upload Data"])
app.include_router(data_extraction.router, prefix=f"{settings.API_V1_STR}/extraction", tags=["3. Data Extraction"])
app.include_router(energy_estimation.router, prefix=f"{settings.API_V1_STR}/energy", tags=["4. Energy Estimation"])
app.include_router(energy_reconciliation.router, prefix=f"{settings.API_V1_STR}/reconciliation", tags=["5. Energy Reconciliation"])
app.include_router(confidence_score.router, prefix=f"{settings.API_V1_STR}/confidence", tags=["6. Confidence Score"])
app.include_router(cost_calculation.router, prefix=f"{settings.API_V1_STR}/cost", tags=["7. Cost Calculation"])
app.include_router(carbon_calculation.router, prefix=f"{settings.API_V1_STR}/carbon", tags=["8. Carbon Calculation"])
app.include_router(scrap_analysis.router, prefix=f"{settings.API_V1_STR}/scrap", tags=["9. Scrap Analysis"])
app.include_router(trend_analysis.router, prefix=f"{settings.API_V1_STR}/trends", tags=["10. Baseline & Trend Analysis"])
app.include_router(recommendations.router, prefix=f"{settings.API_V1_STR}/recommendations", tags=["11. Opportunities & Recommendations"])
app.include_router(report_generation.router, prefix=f"{settings.API_V1_STR}/reports", tags=["12. Evidence Report Generation"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["13. Dashboard & History"])
