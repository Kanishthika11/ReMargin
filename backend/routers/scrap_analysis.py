from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
def get_scrap_analysis():
    total = 6400
    scrap = 210
    good = total - scrap
    yield_pct = (good / total) * 100
    scrap_rate_pct = (scrap / total) * 100

    return {
        "total_production_parts": total,
        "good_parts": good,
        "scrap_quantity_parts": scrap,
        "yield_pct": round(yield_pct, 2),
        "scrap_rate_pct": round(scrap_rate_pct, 2),
        "material_related_emissions_kgCO2e": 482.0
    }
