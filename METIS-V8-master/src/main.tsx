import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
// Remova a linha abaixo:
// import "./types.d.ts";

// --- Componentes Originais ---
import MainRoot from "./routes/MainRoot";
import Chat from "./routes/message/Chat";
import Status from "./routes/status/Status";
import Contact from "./routes/message/Contact";
import Setting from "./routes/message/Setting";
import { MainContextProvider } from "./contexts/MainContext.tsx";

// --- Componentes do Painel Administrativo ---
import AdminLayout from "./admin/AdminLayout";
import DashboardPage from "./admin/DashboardPage";

// --- IMPORTAÇÃO DE TODAS AS PÁGINAS DO DASHBOARD ---
import ColaboradoresPage from "./routes/rh/Colaboradores";
import ControlePontoPage from "./routes/rh/ControlePonto";
import DetalhesPontoPage from "./routes/rh/DetalhesPonto";
import PerfilColaboradorPage from "./routes/rh/PerfilColaborador"; 
import TrainingDashboard from "./routes/rh/TrainingDashboard"; 
import ContasAPagarReceber from "./routes/financeiro/ContasAPagarReceber";
import FeedbackAnonimo from "./routes/chat/FeedbackAnonimo";
import TrainingPage from "./routes/rh/TrainingPage";

// Rotas de Financeiro existentes
import FluxoCaixaPage from "./routes/financeiro/FluxoCaixa";
import ControleDespesasPage from "./routes/financeiro/ControleDespesas";
import FolhaDePagamentoPage from "./routes/financeiro/FolhaDePagamento";

// Outros
import AutomacaoIAPage from "./routes/investimentos/AutomacaoIA";
import RelatoriosInvestimentosPage from "./routes/investimentos/Relatorios";
import ChatIAPage from "./routes/chat/ChatIA";
import RelatoriosGeraisPage from "./routes/relatorios-gerais/RelatoriosGeraisPage";
import RelatorioGeralFuncionariosPage from "./routes/relatorios-gerais/RelatorioGeralFuncionariosPage";
import RelatorioGeralEmpresaPage from "./routes/relatorios-gerais/RelatorioGeralEmpresaPage";
import RelatorioGeralInvestimentosPage from "./routes/relatorios-gerais/RelatorioGeralInvestimentosPage";

// Novo Contexto
import { TrainingProvider } from "./contexts/TrainingContext";

// CORREÇÃO: Importando o componente TrainingManagement
import TrainingManagement from "./routes/rh/TrainingManagement"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/admin" />,
    },
    {
        path: "/admin",
        element: (
          <TrainingProvider>
            <AdminLayout />
          </TrainingProvider>
        ),
        children: [
            { index: true, element: <DashboardPage /> },
            // Rotas de RH
            { path: "rh/colaboradores", element: <ColaboradoresPage /> },
            { path: "rh/colaboradores/:colaboradorId", element: <PerfilColaboradorPage /> }, 
            { path: "rh/ponto", element: <ControlePontoPage /> },
            { path: "rh/ponto/:registroId", element: <DetalhesPontoPage /> },
            // CORREÇÃO: A rota "rh/treinamento" agora usa o componente TrainingManagement
            { path: "rh/treinamento", element: <TrainingManagement /> },
            { path: "rh/treinamento/:trainingId", element: <TrainingPage /> },
            // Rotas de Financeiro
            { path: "financeiro/fluxo-caixa", element: <FluxoCaixaPage /> },
            { path: "financeiro/despesas", element: <ControleDespesasPage /> },
            { path: "financeiro/folha-de-pagamento", element: <FolhaDePagamentoPage /> },
            { path: "financeiro/contas", element: <ContasAPagarReceber /> },
            // Rotas de Investimentos
            { path: "investimentos/automacao", element: <AutomacaoIAPage /> },
            { path: "investimentos/relatorios", element: <RelatoriosInvestimentosPage /> },
            { path: "chat-ia", element: <ChatIAPage /> },
            // Rotas de Relatórios Gerais
            {
              path: "relatorios-gerais",
              element: <RelatoriosGeraisPage />,
              children: [
                { path: "funcionarios", element: <RelatorioGeralFuncionariosPage /> },
                { path: "empresa", element: <RelatorioGeralEmpresaPage /> },
                { path: "investimentos", element: <RelatorioGeralInvestimentosPage /> },
              ]
            },
            // NOVA ROTA PARA FEEDBACK
            { path: "feedback", element: <FeedbackAnonimo /> },
        ],
    },
    {
        path: "/chat",
        element: (
            <MainContextProvider>
                <MainRoot />
            </MainContextProvider>
        ),
        children: [
            { index: true, element: <Chat /> },
            { path: "status/", element: <Status /> },
            { path: "contact/", element: <Contact /> },
            { path: "setting/", element: <Setting /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);