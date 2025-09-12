from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from .product_schemas import Product as FullProductSchema
from ..models.order_models import OrderStatus

# --- Sub-Schemas para aninhamento ---
class ProductInOrderItem(BaseModel):
    id: int
    name: str
    sku: str
    barcode: Optional[str] = None

    class Config:
        from_attributes = True

# --- Schemas para OrderItem ---
class OrderItemBase(BaseModel):
    product_id: int
    quantity_ordered: float
    price_per_unit: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    order_id: int
    picked_lot: Optional[str] = None # CAMPO ADICIONADO AQUI
    product: ProductInOrderItem

    class Config:
        from_attributes = True

# --- Schemas para Order ---
class OrderBase(BaseModel):
    customer_name: str

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    created_at: datetime
    status: OrderStatus
    items: List[OrderItem] = []

    class Config:
        from_attributes = True
