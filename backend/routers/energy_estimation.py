from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

@router.get("/estimate")
def get_energy_estimation():
    return {
        "period": "2026-09",
        "machine_energy": {
            "CNC-01": {"cutting_kwh": 3420.0, "idle_kwh": 850.0, "setup_kwh": 410.0, "operating_hours": 320},
            "CNC-02": {"cutting_kwh": 2980.0, "idle_kwh": 710.0, "setup_kwh": 340.0, "operating_hours": 300},
            "CNC-03": {"cutting_kwh": 2150.0, "idle_kwh": 620.0, "setup_kwh": 280.0, "operating_hours": 260}
        },
        "auxiliary_energy": {
            "Compressor": 1120.0,
            "Coolant": 540.0,
            "HVAC": 860.0,
            "Lighting": 320.0,
            "Pumps": 430.0,
            "Other Equipment": 210.0
        },
        "total_estimated_machine_kwh": 11760.0,
        "total_estimated_auxiliary_kwh": 3480.0,
        "total_estimated_kwh": 15240.0
    }
