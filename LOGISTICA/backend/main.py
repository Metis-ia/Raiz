from fastapi import FastAPI
# Importa o Middleware do CORS
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
# Importa os routers existentes e o novo de autenticação
from .routers import product_router, inventory_router, order_router, auth_router
from .routers.inventory_router import locations_router
# Importa os novos modelos de usuário para a criação das tabelas
from .models import user_models

# Garante que TODAS as tabelas, incluindo as de usuários e cargos, sejam criadas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API do Sistema de Logística",
    description="Backend para o sistema de controle de estoque e expedição.",
    version="1.0.0"
)

# --- CONFIGURAÇÃO DO CORS (MANTIDA COMO ESTAVA) ---
# Lista de origens que podem fazer requisições para a nossa API
origins = [
    "http://localhost:3000", # Endereço do seu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Permite as origens da lista
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, PUT, OPTIONS, etc.)
    allow_headers=["*"], # Permite todos os cabeçalhos
)
# --- FIM DA CONFIGURAÇÃO DO CORS ---


# --- Inclusão dos Routers na aplicação ---
# Adiciona o router de autenticação
app.include_router(auth_router.router, tags=["Autenticação e Usuários"])

# Mantém os routers existentes
app.include_router(product_router.router)
app.include_router(inventory_router.inventory_router)
app.include_router(locations_router)
app.include_router(order_router.router)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bem-vindo à API de Logística"}