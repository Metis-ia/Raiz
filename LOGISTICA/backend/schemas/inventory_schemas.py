from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date

# Importando schemas que vamos precisar aninhar
from .product_schemas import Product
from ..models.inventory_models import TransactionType

# --- Schemas para Location ---
class LocationBase(BaseModel):
    name: str
    warehouse_id: Optional[str] = None
    zone: Optional[str] = None
    aisle: Optional[str] = None
    shelf: Optional[str] = None
    bin: Optional[str] = None
    type: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class Location(LocationBase):
    id: int

    class Config:
        from_attributes = True

# --- Schemas para InventoryBalance ---
class InventoryBalanceBase(BaseModel):
    quantity_on_hand: float
    quantity_reserved: float
    lot_number: Optional[str] = None
    expiration_date: Optional[date] = None
    product_id: int
    location_id: int

class InventoryBalanceCreate(InventoryBalanceBase):
    pass

class InventoryBalance(InventoryBalanceBase):
    id: int
    product: Product
    location: Location

    class Config:
        from_attributes = True

# --- Schemas para InventoryTransaction (Novo) ---
class InventoryTransactionBase(BaseModel):
    tx_type: TransactionType
    quantity: float
    product_id: int
    lot_number: Optional[str] = None
    expiration_date: Optional[date] = None # CAMPO ADICIONADO AQUI
    from_location_id: Optional[int] = None
    to_location_id: Optional[int] = None
    reference_id: Optional[str] = None
    operator_id: Optional[str] = None
    reason: Optional[str] = None

class InventoryTransactionCreate(InventoryTransactionBase):
    pass

class InventoryTransaction(InventoryTransactionBase):
    id: int
    timestamp: datetime
    product: Product
    from_location: Optional[Location] = None
    to_location: Optional[Location] = None

    class Config:
        from_attributes = True