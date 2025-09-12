from sqlalchemy import Column, Integer, String, Float, Boolean, JSON
from ..database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    
    # --- Identificação ---
    sku = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    barcode = Column(String, unique=True, index=True)
    ean = Column(String, unique=True)
    category = Column(String)
    tags = Column(JSON) # Para armazenar uma lista de tags

    # --- Unidades e Dimensões ---
    uom = Column(String, nullable=False) # Unidade de Medida (ex: UN, KG, CX)
    weight_kg = Column(Float)
    dimensions_cm = Column(JSON) # Armazenará um objeto como {"l": 10, "w": 20, "h": 15}
    volume_m3 = Column(Float)

    # --- Custos e Preços ---
    cost_standard = Column(Float)
    cost_average = Column(Float)
    price_list = Column(Float)

    # --- Fiscal e Logístico ---
    ncm = Column(String)
    hs_code = Column(String)
    fragility = Column(String) # Ex: "low", "medium", "high"
    
    # --- Controlo de Estoque ---
    lot_control = Column(Boolean, default=False)
    serial_control = Column(Boolean, default=False)
    min_reorder = Column(Float)
    safety_stock = Column(Float)
    lead_time_days = Column(Integer)

    # --- Dados Adicionais ---
    images = Column(JSON) # Armazenará uma lista de URLs de imagens
    attributes = Column(JSON) # Armazenará um objeto de atributos personalizados, ex: {"color": "blue"}