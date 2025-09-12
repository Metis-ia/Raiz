from pydantic import BaseModel, Field
from typing import Optional, List, Dict

# Importando o schema de produto que vamos precisar
from .product_schemas import Product

# --- Schemas para BoxItem ---

# Schema para um item dentro de uma caixa
class BoxItemBase(BaseModel):
    product_id: int
    quantity: float
    lot_number: Optional[str] = None

class BoxItemCreate(BoxItemBase):
    pass

class BoxItem(BoxItemBase):
    id: int
    product: Product # Aninha os detalhes completos do produto

    class Config:
        from_attributes = True

# --- Schemas para Box ---

# Schema base para uma caixa/volume
class BoxBase(BaseModel):
    order_id: int
    sscc: Optional[str] = None
    weight_kg: Optional[float] = None
    dimensions_cm: Optional[Dict[str, float]] = Field(None, example={"l": 30, "w": 20, "h": 15})

class BoxCreate(BoxBase):
    # Ao criar uma caixa, enviamos a lista de itens que estão dentro dela
    items: List[BoxItemCreate]

class Box(BoxBase):
    id: int
    items: List[BoxItem] = [] # Ao ler uma caixa, retornamos a lista de itens

    class Config:
        from_attributes = True