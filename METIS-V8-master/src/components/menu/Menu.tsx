import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

// Estilo base para os links do menu
const linkStyle = "flex items-center p-3 my-1 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors";
const activeLinkStyle = "bg-primary-100 text-primary-500 dark:bg-neutral-700 dark:text-white";

// Estilo para a nova lista de conversas, para manter a consistência
const conversationLinkStyle = "flex items-center p-2 my-1 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-full";

const Menu = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="w-80 flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col p-4">
            {/* Adicionado flex-col e min-h-0 para permitir que a lista de conversas role independentemente */}
            <div className="flex-grow flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Chat</h1>
                    <Link to="/admin" title="Voltar ao Dashboard" className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700">
                        <i className="ri-arrow-left-line text-xl"></i>
                    </Link>
                </div>
                <nav className="flex-shrink-0">
                    <NavLink 
                        to="/chat" 
                        end 
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                    >
                        <i className="ri-message-3-line mr-3 text-xl"></i>
                        <span>Conversas</span>
                    </NavLink>
                    <NavLink 
                        to="/chat/status" 
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                    >
                        <i className="ri-donut-chart-line mr-3 text-xl"></i>
                        <span>Status</span>
                    </NavLink>
                    <NavLink 
                        to="/chat/contact" 
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                    >
                        <i className="ri-contacts-book-line mr-3 text-xl"></i>
                        <span>Contatos</span>
                    </NavLink>
                    <NavLink 
                        to="/chat/setting" 
                        className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
                    >
                        <i className="ri-settings-3-line mr-3 text-xl"></i>
                        <span>Configurações</span>
                    </NavLink>
                </nav>

                <hr className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

                {/* --- SEÇÃO DE CONVERSAS E GRUPOS MOVIDA E SEPARADA --- */}
                {/* O wrapper div permite que esta seção tenha rolagem própria */}
                <div className="flex-grow overflow-y-auto pr-2">
                    <h3 className="px-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Grupos</h3>
                    <ul>
                        <li>
                            <Link to="/chat/group/familia" className={conversationLinkStyle}>
                                <img src="https://placehold.co/32x32/F4D1D1/6E3535" alt="Avatar do Grupo da Família" className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                                <span className="truncate">Grupo da Família</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat/group/metis" className={conversationLinkStyle}>
                                <img src="https://placehold.co/32x32/D1F4E8/356E55" alt="Avatar do Projeto" className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                                <span className="truncate">Projeto Metis</span>
                            </Link>
                        </li>
                    </ul>

                    <h3 className="px-2 mt-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Conversas</h3>
                    <ul>
                        <li>
                            <Link to="/chat/user/ana" className={conversationLinkStyle}>
                                <img src="https://placehold.co/32x32/EAD9F2/55356E" alt="Avatar de Ana" className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                                <span className="truncate">Ana</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat/user/carlos" className={conversationLinkStyle}>
                                <img src="https://placehold.co/32x32/D1E8F4/355B6E" alt="Avatar de Carlos" className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                                <span className="truncate">Carlos</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mt-auto flex-shrink-0 pt-4">
                <button onClick={toggleTheme} className={`${linkStyle} w-full`}>
                    {theme === 'light' ? (
                        <>
                            <i className="ri-moon-line mr-3 text-xl"></i>
                            <span>Modo Escuro</span>
                        </>
                    ) : (
                        <>
                            <i className="ri-sun-line mr-3 text-xl"></i>
                            <span>Modo Claro</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Menu;

