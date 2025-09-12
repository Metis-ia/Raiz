from sqlalchemy.orm import Session
from typing import List
from ..models import order_models, inventory_models, packing_models
from ..schemas import order_schemas, packing_schemas

# ... (as funções get_order, get_orders, create_order, start_picking_order e finish_picking_order permanecem as mesmas)
def get_order(db: Session, order_id: int):
    return db.query(order_models.Order).filter(order_models.Order.id == order_id).first()

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(order_models.Order).offset(skip).limit(limit).all()

def create_order(db: Session, order: order_schemas.OrderCreate):
    db_order = order_models.Order(customer_name=order.customer_name)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:
        db_item = order_models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity_ordered=item.quantity_ordered,
            price_per_unit=item.price_per_unit
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    
    return db_order

def start_picking_order(db: Session, order_id: int):
    db_order = get_order(db, order_id)

    if not db_order:
        return "not_found"
    
    if db_order.status != order_models.OrderStatus.PENDING:
        return "already_processing"

    for item in db_order.items:
        balance = db.query(inventory_models.InventoryBalance).filter(
            inventory_models.InventoryBalance.product_id == item.product_id,
            inventory_models.InventoryBalance.quantity_on_hand >= item.quantity_ordered
        ).order_by(inventory_models.InventoryBalance.id).first()

        if not balance:
            return f"insufficient_stock_for_product_{item.product_id}"

        balance.quantity_on_hand -= item.quantity_ordered
        balance.quantity_reserved += item.quantity_ordered
        
        item.picked_lot = balance.lot_number
        db.add(item)
    
    db_order.status = order_models.OrderStatus.AWAITING_PICKING
    db.commit()
    db.refresh(db_order)
    
    return db_order

def finish_picking_order(db: Session, order_id: int):
    db_order = get_order(db, order_id)
    if not db_order:
        return "not_found"
    if db_order.status != order_models.OrderStatus.AWAITING_PICKING:
        return "invalid_status"
    db_order.status = order_models.OrderStatus.PICKED
    db.commit()
    db.refresh(db_order)
    return db_order

# --- NOVA FUNÇÃO PARA EMPACOTAR UM PEDIDO ---
def pack_order(db: Session, order_id: int, boxes: List[packing_schemas.BoxCreate]):
    db_order = get_order(db, order_id)
    if not db_order:
        return "not_found"
    
    if db_order.status != order_models.OrderStatus.PICKED:
        return "invalid_status"

    # Itera sobre cada caixa enviada pela API
    for box_data in boxes:
        # Cria a caixa no banco de dados
        db_box = packing_models.Box(
            order_id=order_id,
            sscc=box_data.sscc,
            weight_kg=box_data.weight_kg,
            dimensions_cm=box_data.dimensions_cm
        )
        db.add(db_box)
        db.commit() # Comete para que a caixa tenha um ID
        db.refresh(db_box)

        # Adiciona os itens a essa caixa
        for item_data in box_data.items:
            db_box_item = packing_models.BoxItem(
                box_id=db_box.id,
                product_id=item_data.product_id,
                quantity=item_data.quantity,
                lot_number=item_data.lot_number
            )
            db.add(db_box_item)

    # Atualiza o status do pedido para "Empacotado" (ainda não definido, usaremos PICKED por enquanto)
    # db_order.status = order_models.OrderStatus.PACKED 
    db.commit()
    db.refresh(db_order)

    return db_order