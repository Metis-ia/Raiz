import enum
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class OrderStatus(enum.Enum):
    PENDING = "pending"
    AWAITING_PICKING = "awaiting_picking"
    PICKING_IN_PROGRESS = "picking_in_progress"
    PICKED = "picked"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    quantity_ordered = Column(Float, nullable=False)
    price_per_unit = Column(Float, nullable=False)
    
    # NOVO CAMPO para armazenar o lote reservado para este item
    picked_lot = Column(String, nullable=True) 

    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
