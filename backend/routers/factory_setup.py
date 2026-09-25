from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class MachineSpec(BaseModel):
    code: str # CNC-01, CNC-02
    name: str
    power_rating_kw: float
    cutting_power_kw: float
    idle_power_kw: float
    setup_power_kw: float

class FactorySetupRequest(BaseModel):
    factory_name: str
    location: str
    region: str
    grid_emission_factor: float
    machines: List[MachineSpec]
    auxiliary_equipment: List[str]

@router.post("/setup")
def configure_factory(setup: FactorySetupRequest):
    return {
        "status": "success",
        "message": "Factory setup configured successfully",
        "factory_id": 1,
        "configured_machines": len(setup.machines),
        "configured_auxiliaries": len(setup.auxiliary_equipment),
    }

@router.get("/details")
def get_factory_details():
    return {
        "factory_name": "Precision Auto Components Ltd.",
        "location": "Chennai, India",
        "region": "Southern Grid",
        "grid_emission_factor": 0.82,
        "machines": [
            {"code": "CNC-01", "name": "5-Axis Machining Center", "power_rating_kw": 22.5},
            {"code": "CNC-02", "name": "VMC Lathe Heavy Duty", "power_rating_kw": 18.0}
        ],
        "auxiliaries": ["Compressor", "Coolant Pump", "HVAC Unit 1", "Industrial Lighting"]
    }
