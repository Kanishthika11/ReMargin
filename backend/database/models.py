from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database.db import Base

class Factory(Base):
    __tablename__ = "factories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    region = Column(String)
    grid_emission_factor = Column(Float, default=0.82) # kg CO2e / kWh
    created_at = Column(DateTime, default=datetime.utcnow)

    machines = relationship("Machine", back_populates="factory")
    auxiliaries = relationship("AuxiliaryEquipment", back_populates="factory")


class Machine(Base):
    __tablename__ = "machines"

    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    code = Column(String, index=True) # e.g. CNC-01
    name = Column(String)
    power_rating_kw = Column(Float)
    cutting_power_kw = Column(Float)
    idle_power_kw = Column(Float)
    setup_power_kw = Column(Float)
    
    factory = relationship("Factory", back_populates="machines")


class AuxiliaryEquipment(Base):
    __tablename__ = "auxiliary_equipment"

    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"))
    equipment_type = Column(String) # Compressor, Coolant, HVAC, Lighting, Pumps
    name = Column(String)
    power_rating_kw = Column(Float)

    factory = relationship("Factory", back_populates="auxiliaries")


class UploadedDocument(Base):
    __tablename__ = "uploaded_documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_type = Column(String) # pdf, image, csv
    category = Column(String) # electricity_bill, fuel_bill, production_record, scrap_record
    file_path = Column(String)
    upload_time = Column(DateTime, default=datetime.utcnow)
    processed = Column(Boolean, default=False)


class EnergyReconciliation(Base):
    __tablename__ = "energy_reconciliations"

    id = Column(Integer, primary_key=True, index=True)
    period = Column(String) # YYYY-MM
    actual_kwh = Column(Float)
    estimated_kwh = Column(Float)
    unallocated_kwh = Column(Float)
    reconciliation_error_pct = Column(Float)
    confidence_score_pct = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
