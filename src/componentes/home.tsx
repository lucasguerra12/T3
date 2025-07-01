import React from "react";
import { UsersIcon, ShoppingBagIcon, ScissorsIcon, ListBulletIcon } from '@heroicons/react/24/solid';

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
}

const PaginaPrincipal: React.FC<Props> = ({ tema, seletorView }) => (
    <>
        <div className="flex justify-center bg-sky-100 p-4 min-h-screen">
            <div className="flex flex-col items-center gap-5 w-full py-4">
                <button
                    className="flex flex-col justify-center items-center px-4 py-2 rounded h-40 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                    onClick={(e) => seletorView('Clientes', e)}
                >
                    <UsersIcon className="h-16 w-16 mb-4" />
                    Clientes
                </button>
                <button
                    className="flex flex-col justify-center items-center px-4 py-2 rounded h-40 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                    onClick={(e) => seletorView('Produtos', e)}
                >
                    <ShoppingBagIcon className="h-16 w-16 mb-4" />
                    Produtos
                </button>
                <button
                    className="flex flex-col justify-center items-center px-4 py-2 rounded h-40 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                    onClick={(e) => seletorView('Serviços', e)}
                >
                    <ScissorsIcon className="h-16 w-16 mb-4" />
                    Serviços
                </button>
                <button
                    className="flex flex-col justify-center items-center px-4 py-2 rounded h-40 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                    onClick={(e) => seletorView('ListagensEspeciais', e)}
                >
                    <ListBulletIcon className="h-16 w-16 mb-4" />
                    Listagem especial
                </button>
            </div>
        </div>
    </>
);

export default PaginaPrincipal;