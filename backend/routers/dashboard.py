from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary():
    return {
        "overall": {
            "total_energy_kwh": 14250.0,
            "total_cost_inr": 114000.0,
            "estimated_yearly_cost_inr": 684000.0,
            "total_co2e_t": 13.755,
            "overall_score_pct": 94.2
        },
        "machine_wise_breakdown": [
            {"code": "CNC-01", "energy_pct": 34.0, "cost_inr": 37440.0, "co2e_kg": 4680.0},
            {"code": "CNC-02", "energy_pct": 29.0, "cost_inr": 32240.0, "co2e_kg": 4030.0},
            {"code": "CNC-03", "energy_pct": 22.0, "cost_inr": 24400.0, "co2e_kg": 3050.0},
            {"code": "Auxiliaries", "energy_pct": 15.0, "cost_inr": 19920.0, "co2e_kg": 1995.0}
        ],
        "trends_frequency": "monthly",
        "reports_available": 12,
        "historical_data_count": 24
    }
