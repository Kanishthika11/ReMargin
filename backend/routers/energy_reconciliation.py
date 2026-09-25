from fastapi import APIRouter

router = APIRouter()

@router.get("/reconcile")
def reconcile_energy():
    actual_bill_kwh = 14250.0
    estimated_kwh = 15240.0
    unallocated_kwh = abs(actual_bill_kwh - estimated_kwh)
    error_pct = (unallocated_kwh / actual_bill_kwh) * 100

    return {
        "actual_electricity_consumption_kwh": actual_bill_kwh,
        "total_estimated_energy_kwh": estimated_kwh,
        "unallocated_energy_kwh": unallocated_kwh,
        "reconciliation_error_pct": round(error_pct, 2),
        "reconciliation_status": "WITHIN_ACCEPTABLE_TOLERANCE" if error_pct < 8.0 else "INVESTIGATION_RECOMMENDED"
    }
