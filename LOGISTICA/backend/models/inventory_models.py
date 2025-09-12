import enum
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Date, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class TransactionType(enum.Enum):
    ENTRADA = "entrada"
    SAIDA = "saida"
    TRANSFERENCIA = "transferencia"
    AJUSTE = "ajuste"
    RESERVA = "reserva"

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    warehouse_id = Column(String, index=True)
    zone = Column(String)
    aisle = Column(String)
    shelf = Column(String)
    bin = Column(String)
    type = Column(String)

    balances = relationship("InventoryBalance", back_populates="location")

class InventoryBalance(Base):
    __tablename__ = "inventory_balances"

    id = Column(Integer, primary_key=True, index=True)
    lot_number = Column(String, index=True)
    expiration_date = Column(Date)
    quantity_on_hand = Column(Float, nullable=False, default=0.0)
    quantity_reserved = Column(Float, nullable=False, default=0.0)

    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)

    product = relationship("Product")
    location = relationship("Location", back_populates="balances")

class InventoryTransaction(Base):
    __tablename__ = "inventory_transactions"

    id = Column(Integer, primary_key=True, index=True)
    tx_type = Column(Enum(TransactionType), nullable=False)
    quantity = Column(Float, nullable=False)

    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    lot_number = Column(String)
    expiration_date = Column(Date, nullable=True) # COLUNA ADICIONADA AQUI

    from_location_id = Column(Integer, ForeignKey("locations.id"))
    to_location_id = Column(Integer, ForeignKey("locations.id"))

    reference_id = Column(String)
    operator_id = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    reason = Column(String)

    product = relationship("Product")
    from_location = relationship("Location", foreign_keys=[from_location_id])
    to_location = relationship("Location", foreign_keys=[to_location_id])