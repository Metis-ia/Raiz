from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Box(Base):
    __tablename__ = "boxes"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    
    # Serial Shipping Container Code - código de barras único para o volume
    sscc = Column(String, unique=True, index=True)
    
    weight_kg = Column(Float)
    dimensions_cm = Column(JSON) # Armazenará {"l": 10, "w": 20, "h": 15}
    
    # Relacionamento para ver os itens dentro desta caixa
    items = relationship("BoxItem", back_populates="box")
    order = relationship("Order")

class BoxItem(Base):
    __tablename__ = "box_items"

    id = Column(Integer, primary_key=True, index=True)
    box_id = Column(Integer, ForeignKey("boxes.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Float, nullable=False)
    lot_number = Column(String)

    box = relationship("Box", back_populates="items")
    product = relationship("Product")