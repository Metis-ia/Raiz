from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..crud import product_crud
from ..schemas import product_schemas
from ..database import get_db

router = APIRouter(
    prefix="/api/products",
    tags=["Catálogo de Produtos"],
    responses={404: {"description": "Não encontrado"}},
)

@router.post("/", response_model=product_schemas.Product)
def create_product(product: product_schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = product_crud.get_product_by_sku(db, sku=product.sku)
    if db_product:
        raise HTTPException(status_code=400, detail="SKU já cadastrado no sistema.")
    return product_crud.create_product(db=db, product=product)

@router.get("/", response_model=List[product_schemas.Product])
def list_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = product_crud.get_products(db, skip=skip, limit=limit)
    return products

# O endpoint de atualização agora usa o schema 'ProductUpdate'
@router.put("/{product_id}", response_model=product_schemas.Product)
def update_product_details(product_id: int, product_update: product_schemas.ProductUpdate, db: Session = Depends(get_db)):
    db_product = product_crud.update_product(db, product_id=product_id, product_update=product_update)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado para atualização.")
    return db_product

@router.get("/{product_id}", response_model=product_schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = product_crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado.")
    return db_product