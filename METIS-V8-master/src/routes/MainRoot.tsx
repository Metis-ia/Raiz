import Menu from "../components/menu/Menu";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Outlet } from "react-router-dom";

// O MainRoot agora é um componente de layout simples
// Ele renderiza o Menu e o Outlet para as páginas filhas
export default function MainRoot() {
    return (
        <ThemeProvider>
            <div className="flex h-screen pb-16 md:pb-0">
                <Menu />
                <Outlet />
            </div>
        </ThemeProvider>
    );
}