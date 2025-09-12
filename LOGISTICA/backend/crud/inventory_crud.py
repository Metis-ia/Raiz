from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from ..models import inventory_models, product_models
from ..schemas import inventory_schemas

# --- Funções para Location ---

def get_location(db: Session, location_id: int):
    return db.query(inventory_models.Location).filter(inventory_models.Location.id == location_id).first()

def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(inventory_models.Location).offset(skip).limit(limit).all()

def create_location(db: Session, location: inventory_schemas.LocationCreate):
    db_location = inventory_models.Location(**location.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

# --- Funções para InventoryBalance ---

def get_balance(db: Session, product_id: int, location_id: int, lot_number: Optional[str]):
    query = db.query(inventory_models.InventoryBalance).filter(
        inventory_models.InventoryBalance.product_id == product_id,
        inventory_models.InventoryBalance.location_id == location_id
    )
    if not lot_number:
        query = query.filter(
            (inventory_models.InventoryBalance.lot_number == None) |
            (inventory_models.InventoryBalance.lot_number == '')
        )
    else:
        query = query.filter(inventory_models.InventoryBalance.lot_number == lot_number)
    return query.first()

# ATUALIZADO: Agora pode filtrar por product_id
def get_balances(db: Session, skip: int = 0, limit: int = 100, product_id: Optional[int] = None):
    query = db.query(inventory_models.InventoryBalance)
    if product_id:
        query = query.filter(inventory_models.InventoryBalance.product_id == product_id)
    return query.offset(skip).limit(limit).all()

# --- NOVA FUNÇÃO PARA RESUMIR O ESTOQUE ---
def get_inventory_summary(db: Session):
    # Esta consulta agrupa os saldos por produto e soma as quantidades
    summary = db.query(
        product_models.Product,
        func.sum(inventory_models.InventoryBalance.quantity_on_hand).label("total_on_hand")
    ).join(
        inventory_models.InventoryBalance, 
        inventory_models.InventoryBalance.product_id == product_models.Product.id
    ).group_by(
        product_models.Product.id
    ).all()
    return summary

# --- Função Central de Transações ---

def create_transaction_and_update_balance(db: Session, transaction: inventory_schemas.InventoryTransactionCreate):
    db_transaction = inventory_models.InventoryTransaction(**transaction.dict(exclude_unset=True))
    
    if db_transaction.tx_type == inventory_models.TransactionType.ENTRADA:
        if not transaction.to_location_id:
            raise ValueError("Entrada de estoque requer uma localização de destino (to_location_id).")
        
        balance = get_balance(db, transaction.product_id, transaction.to_location_id, transaction.lot_number)
        
        if balance:
            balance.quantity_on_hand += transaction.quantity
        else:
            balance = inventory_models.InventoryBalance(
                product_id=transaction.product_id,
                location_id=transaction.to_location_id,
                lot_number=transaction.lot_number,
                expiration_date=transaction.expiration_date,
                quantity_on_hand=transaction.quantity,
                quantity_reserved=0
            )
            db.add(balance)
            
    elif db_transaction.tx_type == inventory_models.TransactionType.SAIDA:
        if not transaction.from_location_id:
            raise ValueError("Saída de estoque requer uma localização de origem (from_location_id).")
            
        balance = get_balance(db, transaction.product_id, transaction.from_location_id, transaction.lot_number)
        
        if not balance or balance.quantity_on_hand < transaction.quantity:
            raise ValueError("Estoque insuficiente para a saída.")
            
        balance.quantity_on_hand -= transaction.quantity
    
    else:
        raise ValueError("Tipo de transação não suportado.")

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    
    return db_transaction