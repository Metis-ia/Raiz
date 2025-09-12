import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import './AdminLayout.css';
import './style.css';

// TEMA PADRÃO (CLARO) COM CORES MAIS VIBRANTES
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Azul mais forte
    },
    background: {
      default: '#F4F6F8', // Fundo levemente acinzentado
      paper: '#FFFFFF',
    },
    action: {
      hover: '#E3F2FD', // Fundo do balão da IA
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90CAF9' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#E0E0E0', secondary: '#B0B0B0' },
    action: { hover: '#333333' }
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'unset' } } },
    MuiAvatar: { styleOverrides: { root: { bgcolor: '#3A3A3A' } } }
  }
});

interface OpenMenusState { [key: string]: boolean; }
interface MenuPosition { top: number; left: number; }

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState<OpenMenusState>({});
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
    const location = useLocation();

    // Lógica para selecionar o tema com base na rota
    const isChatPage = location.pathname.includes('/chat-ia');
    const theme = isChatPage ? lightTheme : lightTheme;

    // A lógica do menu permanece a mesma
    useEffect(() => {
        const currentPath = location.pathname.split('/')[2];
        if (currentPath && !openMenus[currentPath]) { setOpenMenus({ [currentPath]: true }); }
    }, [location.pathname]);
    useEffect(() => {
        if (!isSidebarOpen) { document.body.classList.add('sidebar-collapsed'); } 
        else { document.body.classList.remove('sidebar-collapsed'); }
    }, [isSidebarOpen]);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSubmenu = (menuName: string) => {
        if (!document.body.classList.contains('sidebar-collapsed')) {
            setOpenMenus(prev => ({ [menuName]: !prev[menuName] }));
        }
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>, menuName: string) => {
        if (document.body.classList.contains('sidebar-collapsed')) {
            const rect = e.currentTarget.getBoundingClientRect();
            setMenuPosition({ top: rect.top, left: rect.right });
            setHoveredMenu(menuName);
        }
    };
    const handleMouseLeave = () => {
        if (document.body.classList.contains('sidebar-collapsed')) { setHoveredMenu(null); }
    };
    const isSubmenuOpen = (menuName: string) => openMenus[menuName] || hoveredMenu === menuName;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* O JSX do layout (sidebar, topbar, etc.) permanece o mesmo */}
            <div className={`sidebar`}>
                <a href="/admin" className="sidebar-brand">
                    <img src="https://placehold.co/32x32" alt="Logo Metis" className="sidebar-brand-image" />
                    <span className="sidebar-brand-text">METIS</span>
                </a>
                <div className="sidebar-menu-wrapper">
                    <ul className="sidebar-menu">
                        <li className="sidebar-menu-title">
                            <span className="sidebar-menu-title-expanded">MENU</span>
                            <span className="sidebar-menu-title-collapsed"><i className="ri-more-fill"></i></span>
                        </li>
                        <li className={`sidebar-menu-item ${location.pathname === '/admin' ? 'active' : ''}`}>
                             <Link to="/admin" className="sidebar-menu-item-link">
                                 <span className="sidebar-menu-item-link-icon"><i className="ri-dashboard-line"></i></span>
                                 <span className="sidebar-menu-item-link-text">Dashboard</span>
                             </Link>
                        </li>
                        <li className={`sidebar-menu-item ${openMenus.rh ? 'active' : ''}`} onMouseEnter={(e) => handleMouseEnter(e, 'rh')} onMouseLeave={handleMouseLeave}>
                            <button type="button" className="sidebar-menu-item-link" onClick={() => toggleSubmenu('rh')}>
                                <span className="sidebar-menu-item-link-icon"><i className="ri-team-line"></i></span>
                                <span className="sidebar-menu-item-link-text">Recursos Humanos</span>
                                <span className="sidebar-menu-item-link-arrow"><i className="ri-arrow-right-s-line"></i></span>
                            </button>
                            <ul className={`sidebar-submenu`} style={isSubmenuOpen('rh') && menuPosition ? { top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, display: 'block' } : {}}>
                                <li className="sidebar-submenu-item"><Link to="/admin/rh/colaboradores" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Colaboradores</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/rh/ponto" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Controle de Ponto</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/rh/treinamento" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Treinamento</span></Link></li>
                            </ul>
                        </li>
                        <li className={`sidebar-menu-item ${openMenus.financeiro ? 'active' : ''}`} onMouseEnter={(e) => handleMouseEnter(e, 'financeiro')} onMouseLeave={handleMouseLeave}>
                            <button type="button" className="sidebar-menu-item-link" onClick={() => toggleSubmenu('financeiro')}>
                                <span className="sidebar-menu-item-link-icon"><i className="ri-money-dollar-circle-line"></i></span>
                                <span className="sidebar-menu-item-link-text">Financeiro</span>
                                <span className="sidebar-menu-item-link-arrow"><i className="ri-arrow-right-s-line"></i></span>
                            </button>
                            <ul className={`sidebar-submenu`} style={isSubmenuOpen('financeiro') && menuPosition ? { top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, display: 'block' } : {}}>
                                <li className="sidebar-submenu-item"><Link to="/admin/financeiro/fluxo-caixa" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Fluxo de Caixa</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/financeiro/despesas" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Controle de Despesas</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/financeiro/folha-de-pagamento" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Folha de Pagamento</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/financeiro/contas" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Contas Pagar/Receber</span></Link></li>
                            </ul>
                        </li>
                        <li className={`sidebar-menu-item ${openMenus.investimentos ? 'active' : ''}`} onMouseEnter={(e) => handleMouseEnter(e, 'investimentos')} onMouseLeave={handleMouseLeave}>
                            <button type="button" className="sidebar-menu-item-link" onClick={() => toggleSubmenu('investimentos')}>
                                <span className="sidebar-menu-item-link-icon"><i className="ri-line-chart-line"></i></span>
                                <span className="sidebar-menu-item-link-text">Investimentos</span>
                                <span className="sidebar-menu-item-link-arrow"><i className="ri-arrow-right-s-line"></i></span>
                            </button>
                            <ul className={`sidebar-submenu`} style={isSubmenuOpen('investimentos') && menuPosition ? { top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, display: 'block' } : {}}>
                                <li className="sidebar-submenu-item"><Link to="/admin/investimentos/automacao" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Automação IA</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/investimentos/relatorios" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Relatórios</span></Link></li>
                            </ul>
                        </li>
                        <li className={`sidebar-menu-item ${openMenus.chat ? 'active' : ''}`} onMouseEnter={(e) => handleMouseEnter(e, 'chat')} onMouseLeave={handleMouseLeave}>
                            <button type="button" className="sidebar-menu-item-link" onClick={() => toggleSubmenu('chat')}>
                                <span className="sidebar-menu-item-link-icon"><i className="ri-message-2-line"></i></span>
                                <span className="sidebar-menu-item-link-text">Comunicação</span>
                                <span className="sidebar-menu-item-link-arrow"><i className="ri-arrow-right-s-line"></i></span>
                            </button>
                            <ul className={`sidebar-submenu`} style={isSubmenuOpen('chat') && menuPosition ? { top: `${menuPosition.top}px`, left: `${menuPosition.left}px`, display: 'block' } : {}}>
                                <li className="sidebar-submenu-item"><Link to="/admin/chat-ia" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Chat com IA</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/chat" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Bate-papo da Empresa</span></Link></li>
                                <li className="sidebar-submenu-item"><Link to="/admin/feedback" className="sidebar-submenu-item-link"><span className="sidebar-submenu-item-link-text">Feedback Anônimo</span></Link></li>
                            </ul>
                        </li>
                        <li className={`sidebar-menu-item ${location.pathname.startsWith('/admin/relatorios-gerais') ? 'active' : ''}`}>
                             <Link to="/admin/relatorios-gerais" className="sidebar-menu-item-link">
                                 <span className="sidebar-menu-item-link-icon"><i className="ri-file-chart-line"></i></span>
                                 <span className="sidebar-menu-item-link-text">Relatórios Gerais</span>
                             </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`sidebar-overlay ${!isSidebarOpen ? '' : 'active'}`} onClick={toggleSidebar}></div>
            <div className="main">
                <div className="topbar">
                     <button type="button" className="topbar-sidebar-toggle" onClick={toggleSidebar}>
                         <i className="ri-menu-line"></i>
                     </button>
                </div>
                <div className="content"><Outlet /></div>
            </div>
        </ThemeProvider>
    );
};
export default AdminLayout;