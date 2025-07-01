import React from "react";
import { ArrowLeftIcon, ListBulletIcon } from "@heroicons/react/24/solid"

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: React.MouseEvent) => void
}

const ListagensEspeciais: React.FC<Props> = ({ tema, seletorView }) => (
    <>
        {/* Container com fundo azul claro */}
        <div className="bg-sky-100 min-h-screen">
            <div className="flex w-full p-4">
                {/* Botão Voltar com novo estilo */}
                <button
                    className="flex p-3 items-center text-xl font-semibold text-gray-700 hover:bg-sky-300 transition rounded-xl bg-sky-200 shadow"
                    onClick={(e) => seletorView('Home', e)}
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Voltar
                </button>
            </div>
            {/* Container dos botões principais */}
            <div className="w-full flex justify-center p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl">
                    <button className="flex flex-col justify-center items-center text-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">
                        <ListBulletIcon className="h-16 w-16 mb-4" />
                        Listagem de mais consumidos
                    </button>
                    <button className="flex flex-col justify-center items-center text-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">
                        <ListBulletIcon className="h-16 w-16 mb-4" />
                        Listagem de mais consumidos por gênero
                    </button>
                </div>
            </div>
        </div>
    </>
);

export default ListagensEspeciais;