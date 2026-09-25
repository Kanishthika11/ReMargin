from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional

router = APIRouter()

@router.post("/bill")
async def upload_electricity_bill(file: UploadFile = File(...), bill_month: Optional[str] = Form("2026-09")):
    return {
        "status": "uploaded",
        "file_id": "bill_202609_001",
        "filename": file.filename,
        "bill_month": bill_month,
        "content_type": file.content_type,
    }

@router.post("/fuel")
async def upload_fuel_bills(file: UploadFile = File(...)):
    return {
        "status": "uploaded",
        "file_id": "fuel_202609_001",
        "filename": file.filename,
    }

@router.post("/production")
async def upload_production_records(file: UploadFile = File(...)):
    return {
        "status": "uploaded",
        "file_id": "prod_202609_001",
        "filename": file.filename,
    }

@router.post("/scrap")
async def upload_scrap_records(file: UploadFile = File(...)):
    return {
        "status": "uploaded",
        "file_id": "scrap_202609_001",
        "filename": file.filename,
    }
