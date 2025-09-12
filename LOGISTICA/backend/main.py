from fastapi import FastAPI
# Importa o Middleware do CORS
from fastapi.middleware.cors import CORSMiddleware 
from .database import engine, Base
from .routers import product_router, inventory_router, order_router
from .routers.inventory_router import locations_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API do Sistema de Logística",
    description="Backend para o sistema de controle de estoque e expedição.",
    version="1.0.0"
)

# --- CONFIGURAÇÃO DO CORS (A PARTE MAIS IMPORTANTE PARA O ERRO ATUAL) ---
# Lista de origens que podem fazer requisições para a nossa API
origins = [
    "http://localhost:3000", # Endereço do nosso frontend Next.js
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Permite as origens da lista
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, PUT, OPTIONS, etc.)
    allow_headers=["*"], # Permite todos os cabeçalhos
)
# --- FIM DA CONFIGURAÇÃO DO CORS ---


# Inclui todos os routers na aplicação
app.include_router(product_router.router)
app.include_router(inventory_router.inventory_router)
app.include_router(locations_router)
app.include_router(order_router.router)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bem-vindo à API de Logística"}