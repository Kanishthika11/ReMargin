from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class ExtractOCRRequest(BaseModel):
    file_id: str

@router.post("/process-ocr")
def process_ocr(req: ExtractOCRRequest):
    return {
        "file_id": req.file_id,
        "status": "extracted",
        "raw_text_snippet": "TANGEDCO High Tension Electricity Bill - Bimonthly Units Consumed: 14,250 kWh",
        "extracted_fields": {
            "utility_provider": "TANGEDCO",
            "consumer_number": "09-241-002-1200",
            "billing_period": "Jul 2026 - Aug 2026",
            "total_kwh": 14250.0,
            "total_amount_inr": 114000.0,
            "peak_demand_kva": 42.5,
            "power_factor": 0.96
        },
        "validation_status": "VALIDATED_CLEAN"
    }
