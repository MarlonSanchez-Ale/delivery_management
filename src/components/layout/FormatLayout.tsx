import React, { ReactNode } from 'react';
import { SideBar } from '../elements/NavigateElements/SideBar';
interface FormatLayoutProps {
    children: ReactNode;
}

const FormatLayout: React.FC<FormatLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="hidden md:w-72 md:flex text-white p-4">
                {/* Contenido de la barra lateral */}
                <SideBar />
            </div>

            {/* Contenido principal */}
            <div className="flex-1 p-5 overflow-y-auto sm:mb-5 md:mb-1">
                {children}
            </div>
        </div>
    );
};

export default FormatLayout;
