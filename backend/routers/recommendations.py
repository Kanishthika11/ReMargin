from fastapi import APIRouter

router = APIRouter()

@router.get("/interventions")
def get_recommendations():
    return {
        "areas_for_improvement": [
            {
                "id": "REC-01",
                "category": "High Idle Time",
                "title": "Optimize CNC-01 & CNC-03 Warm-up & Standby Schedules",
                "potential_savings_inr": 42000.0,
                "potential_co2_reduction_kg": 4300.0,
                "priority": "HIGH"
            },
            {
                "id": "REC-02",
                "category": "Process Inefficiency",
                "title": "Install VFD Drives on Primary Compressor Auxiliary",
                "potential_savings_inr": 28000.0,
                "potential_co2_reduction_kg": 2900.0,
                "priority": "MEDIUM"
            },
            {
                "id": "REC-03",
                "category": "High Scrap Rate",
                "title": "Tool Wear Sensor Calibration to reduce workpiece rejection",
                "potential_savings_inr": 35000.0,
                "potential_co2_reduction_kg": 1800.0,
                "priority": "HIGH"
            }
        ]
    }
