from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ATENÇÃO: Substitua a linha abaixo com os dados do seu banco de dados PostgreSQL.
# Formato: "postgresql://usuario:senha@servidor:porta/nome_do_banco"
SQLALCHEMY_DATABASE_URL = "postgresql://testuser:testpassword123@localhost/logistica_db?client_encoding=utf8"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Função para obter uma sessão do banco de dados em cada requisição da API
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()