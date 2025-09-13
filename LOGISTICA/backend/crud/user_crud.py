# LOGISTICA/backend/crud/user_crud.py
from sqlalchemy.orm import Session
from ..models import user_models
from ..schemas import user_schemas
from ..auth import get_password_hash

# --- Role CRUD ---
def get_role(db: Session, role_id: int):
    return db.query(user_models.Role).filter(user_models.Role.id == role_id).first()

def get_role_by_name(db: Session, name: str):
    return db.query(user_models.Role).filter(user_models.Role.name == name).first()

def get_roles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user_models.Role).offset(skip).limit(limit).all()

def create_role(db: Session, role: user_schemas.RoleCreate):
    db_role = user_models.Role(name=role.name, description=role.description)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

# --- User CRUD ---
def get_user(db: Session, user_id: int):
    return db.query(user_models.User).filter(user_models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(user_models.User).filter(user_models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user_models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: user_schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = user_models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        role_id=user.role_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user