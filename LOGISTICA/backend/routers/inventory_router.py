from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from ..crud import inventory_crud
from ..schemas import inventory_schemas
from ..database import get_db
from ..models import inventory_models

locations_router = APIRouter(prefix="/api/locations", tags=["Inventory Locations"])
inventory_router = APIRouter(prefix="/api/inventory", tags=["Inventory Transactions & Balances"])

# --- Endpoints para Locations ---

@locations_router.post("/", response_model=inventory_schemas.Location)
def create_location(location: inventory_schemas.LocationCreate, db: Session = Depends(get_db)):
    existing_location = db.query(inventory_models.Location).filter(inventory_models.Location.name == location.name).first()
    if existing_location:
        raise HTTPException(status_code=400, detail="Localização já cadastrada com este nome.")
    return inventory_crud.create_location(db=db, location=location)

@locations_router.get("/", response_model=List[inventory_schemas.Location])
def list_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    locations = inventory_crud.get_locations(db, skip=skip, limit=limit)
    return locations

# --- Endpoints para Inventário (Saldos e Transações) ---

# ATUALIZADO: Agora aceita um product_id opcional para filtrar
@inventory_router.get("/balances/", response_model=List[inventory_schemas.InventoryBalance])
def list_all_balances(
    skip: int = 0, 
    limit: int = 100, 
    product_id: Optional[int] = None, 
    db: Session = Depends(get_db)
):
    balances = inventory_crud.get_balances(db, skip=skip, limit=limit, product_id=product_id)
    return balances

# --- NOVO ENDPOINT PARA A LISTA RESUMIDA ---
@inventory_router.get("/summary/")
def get_inventory_summary(db: Session = Depends(get_db)):
    summary_data = inventory_crud.get_inventory_summary(db)
    # Formata os dados para um JSON amigável
    return [
        {
            "product": product, 
            "total_on_hand": total_on_hand
        } 
        for product, total_on_hand in summary_data
    ]

@inventory_router.post("/transactions/", response_model=inventory_schemas.InventoryTransaction)
def create_inventory_transaction(
    transaction: inventory_schemas.InventoryTransactionCreate, 
    db: Session = Depends(get_db)
):
    try:
        db_transaction = inventory_crud.create_transaction_and_update_balance(db, transaction=transaction)
        return db_transaction
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocorreu um erro inesperado: {str(e)}")