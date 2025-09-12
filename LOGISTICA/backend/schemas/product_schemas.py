from pydantic import BaseModel, Field
from typing import Optional, List, Dict

# --- Schemas para Product ---

class ProductBase(BaseModel):
    # Identificação
    sku: str
    name: str
    description: Optional[str] = None
    barcode: Optional[str] = None
    ean: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None

    # Unidades e Dimensões
    uom: str
    weight_kg: Optional[float] = None
    dimensions_cm: Optional[Dict[str, float]] = Field(None, example={"l": 10, "w": 20, "h": 15})
    volume_m3: Optional[float] = None

    # Custos e Preços
    cost_standard: Optional[float] = None
    cost_average: Optional[float] = None
    price_list: Optional[float] = None

    # Fiscal e Logístico
    ncm: Optional[str] = None
    hs_code: Optional[str] = None
    fragility: Optional[str] = None

    # Controle de Estoque
    lot_control: bool = False
    serial_control: bool = False
    min_reorder: Optional[float] = None
    safety_stock: Optional[float] = None
    lead_time_days: Optional[int] = None

    # Dados Adicionais
    images: Optional[List[str]] = None
    attributes: Optional[Dict[str, str]] = Field(None, example={"color": "blue", "size": "M"})

# Schema para CRIAR um produto (campos obrigatórios são exigidos)
class ProductCreate(ProductBase):
    pass

# --- NOVO SCHEMA PARA ATUALIZAR ---
# Todos os campos são opcionais, permitindo atualizações parciais.
class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    barcode: Optional[str] = None
    ean: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    uom: Optional[str] = None
    weight_kg: Optional[float] = None
    dimensions_cm: Optional[Dict[str, float]] = None
    volume_m3: Optional[float] = None
    cost_standard: Optional[float] = None
    cost_average: Optional[float] = None
    price_list: Optional[float] = None
    ncm: Optional[str] = None
    hs_code: Optional[str] = None
    fragility: Optional[str] = None
    lot_control: Optional[bool] = None
    serial_control: Optional[bool] = None
    min_reorder: Optional[float] = None
    safety_stock: Optional[float] = None
    lead_time_days: Optional[int] = None
    images: Optional[List[str]] = None
    attributes: Optional[Dict[str, str]] = None

# Schema para LER um produto (retorno da API)
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True