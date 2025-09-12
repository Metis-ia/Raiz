from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..crud import order_crud
from ..schemas import order_schemas, packing_schemas # Importa os schemas de packing
from ..database import get_db

router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)

# ... (os endpoints create_order, list_orders, get_order_details, start_picking, finish_picking permanecem os mesmos)
@router.post("/", response_model=order_schemas.Order)
def create_order(order: order_schemas.OrderCreate, db: Session = Depends(get_db)):
    if not order.items:
        raise HTTPException(status_code=400, detail="O pedido deve conter pelo menos um item.")
    
    return order_crud.create_order(db=db, order=order)

@router.get("/", response_model=List[order_schemas.Order])
def list_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = order_crud.get_orders(db, skip=skip, limit=limit)
    return orders

@router.get("/{order_id}", response_model=order_schemas.Order)
def get_order_details(order_id: int, db: Session = Depends(get_db)):
    db_order = order_crud.get_order(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return db_order

@router.post("/{order_id}/start-picking", response_model=order_schemas.Order)
def start_picking(order_id: int, db: Session = Depends(get_db)):
    result = order_crud.start_picking_order(db, order_id=order_id)
    
    if isinstance(result, str):
        if result == "not_found":
            raise HTTPException(status_code=404, detail=f"Pedido com ID {order_id} não encontrado.")
        if result == "already_processing":
            raise HTTPException(status_code=400, detail="Este pedido já está em processamento ou finalizado.")
        if "insufficient_stock" in result:
            product_id = result.split("_")[-1]
            raise HTTPException(status_code=400, detail=f"Estoque insuficiente para o produto com ID {product_id}.")
            
    return result

@router.post("/{order_id}/finish-picking", response_model=order_schemas.Order)
def finish_picking(order_id: int, db: Session = Depends(get_db)):
    result = order_crud.finish_picking_order(db, order_id=order_id)

    if result == "not_found":
        raise HTTPException(status_code=404, detail=f"Pedido com ID {order_id} não encontrado.")
    if result == "invalid_status":
        raise HTTPException(status_code=400, detail="O pedido não está no status correto para finalizar a separação.")

    return result

# --- NOVO ENDPOINT PARA EMPACOTAR UM PEDIDO ---
@router.post("/{order_id}/pack", response_model=order_schemas.Order)
def pack_order(order_id: int, boxes: List[packing_schemas.BoxCreate], db: Session = Depends(get_db)):
    result = order_crud.pack_order(db, order_id=order_id, boxes=boxes)
    
    if result == "not_found":
        raise HTTPException(status_code=404, detail=f"Pedido com ID {order_id} não encontrado.")
    if result == "invalid_status":
        raise HTTPException(status_code=400, detail="O pedido não está no status correto para ser empacotado.")
        
    return result