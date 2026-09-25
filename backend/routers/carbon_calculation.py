from fastapi import APIRouter

router = APIRouter()

@router.get("/emissions")
def get_carbon_emissions():
    return {
        "scope1_emissions_tCO2e": {
            "diesel_generator": 1.45,
            "LPG_heating": 0.62,
            "total_scope1": 2.07
        },
        "scope2_emissions_tCO2e": {
            "electricity_grid": 11.685, # 14,250 kWh * 0.82 kg/kWh / 1000
            "total_scope2": 11.685
        },
        "total_CO2e_tCO2e": 13.755,
        "CO2e_per_part_kg": 2.22,
        "emission_factor_used": "0.82 kg CO2e/kWh (India Southern Grid)"
    }
