from fastapi import APIRouter

router = APIRouter()

@router.get("/score")
def get_confidence_score():
    return {
        "data_completeness_pct": 96.5,
        "data_quality_score_pct": 94.0,
        "model_accuracy": {
            "MAE": 12.4,
            "RMSE": 18.2,
            "MAPE": 4.12
        },
        "bill_reconciliation_score": 93.1,
        "final_confidence_score_pct": 94.2
    }
