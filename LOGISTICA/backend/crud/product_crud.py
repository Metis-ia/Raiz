from sqlalchemy.orm import Session
from ..models import product_models
from ..schemas import product_schemas

def get_product(db: Session, product_id: int):
    return db.query(product_models.Product).filter(product_models.Product.id == product_id).first()

def get_product_by_sku(db: Session, sku: str):
    return db.query(product_models.Product).filter(product_models.Product.sku == sku).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(product_models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: product_schemas.ProductCreate):
    db_product = product_models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# A função de atualização agora espera o schema 'ProductUpdate'
def update_product(db: Session, product_id: int, product_update: product_schemas.ProductUpdate):
    db_product = get_product(db, product_id=product_id)
    if not db_product:
        return None

    # O 'exclude_unset=True' é crucial: ele garante que apenas os campos
    # que o usuário realmente enviou sejam incluídos na atualização.
    update_data = product_update.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product