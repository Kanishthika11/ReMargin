from fastapi import APIRouter

router = APIRouter()

@router.get("/breakdown")
def get_cost_calculation():
    rate_per_kwh = 8.0 # INR per kWh
    return {
        "currency": "INR",
        "symbol": "₹",
        "rate_per_kwh": rate_per_kwh,
        "cost_per_machine": {
            "CNC-01": 37440.0,
            "CNC-02": 32240.0,
            "CNC-03": 24400.0
        },
        "cost_per_activity": {
            "cutting": 68400.0,
            "idle": 17440.0,
            "setup": 8240.0
        },
        "cost_per_auxiliary": {
            "Compressor": 8960.0,
            "HVAC": 6880.0,
            "Coolant": 4320.0,
            "Lighting": 2560.0,
            "Pumps": 3440.0
        },
        "cost_per_part": 18.45,
        "total_electricity_cost": 114000.0,
        "estimated_yearly_cost": 684000.0
    }
