from fastapi import APIRouter

router = APIRouter()

@router.get("/historical")
def get_trend_analysis():
    return {
        "monthly_trends": [
            {"month": "May 2026", "energy_kwh": 16400, "cost_inr": 131200, "CO2e_t": 15.2, "scrap_pct": 3.8},
            {"month": "Jun 2026", "energy_kwh": 15800, "cost_inr": 126400, "CO2e_t": 14.6, "scrap_pct": 3.5},
            {"month": "Jul 2026", "energy_kwh": 15100, "cost_inr": 120800, "CO2e_t": 14.1, "scrap_pct": 3.4},
            {"month": "Aug 2026", "energy_kwh": 14600, "cost_inr": 116800, "CO2e_t": 13.9, "scrap_pct": 3.3},
            {"month": "Sep 2026", "energy_kwh": 14250, "cost_inr": 114000, "CO2e_t": 13.75, "scrap_pct": 3.28}
        ],
        "performance_improvement_pct": 13.11
    }
