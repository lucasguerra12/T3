import { ArrowLeftIcon, ListBulletIcon, UserCircleIcon, UserMinusIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"
import Modal from "./Modal"

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: React.MouseEvent) => void
}

const Clientes: React.FC<Props> = ({ tema, seletorView }) => {
    const [mostrarListagens, setMostrarListagens] = useState(false);
    const [atualizarCliente, setAtualizarCliente] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalConteudo, setModalConteudo] = useState<React.ReactNode>(null);

    const abrirModal = (conteudo: React.ReactNode) => {
        setModalAberto(true);
        setModalConteudo(conteudo);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setModalConteudo(null);
    };

    const handleListagensClick = () => {
        setMostrarListagens((prev) => !prev);
        setAtualizarCliente(false);
    };

    const handleAtualizarClienteClick = () => {
        setAtualizarCliente((prev) => !prev);
        setMostrarListagens(false);
    };

    return (
        <>
            
            <div className="bg-sky-100 min-h-screen">
                <div className="flex w-full p-4">
                    
                    <button
                        className="flex p-3 items-center text-xl font-semibold text-gray-700 hover:bg-sky-300 transition rounded-xl bg-sky-200 shadow"
                        onClick={(e) => seletorView('Home', e)}
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Voltar
                    </button>
                </div>

               
                <div className="flex flex-wrap p-4 gap-5 justify-center">
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                        onClick={handleAtualizarClienteClick}
                    >
                        <UserCircleIcon className="h-16 w-16 mb-4" />
                        Atualizar 
                    </button>
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                        onClick={() =>
                            abrirModal(
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold">Informe o CPF do cliente a ser excluído:</h2>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                            id="cpf_excluir"
                                            type="text"
                                            placeholder="000.000.000-00"
                                        />
                                    </label>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={fecharModal}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    >
                        <UserMinusIcon className="h-16 w-16 mb-4" />
                        Excluir 
                    </button>
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full max-w-xs text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                        onClick={handleListagensClick}
                    >
                        <ListBulletIcon className="h-16 w-16 mb-4" />
                        Listagens
                    </button>
                </div>

                
                {atualizarCliente && (
                    <div className="flex flex-wrap p-4 gap-4 justify-center">
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Atualizar Nome</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Atualizar CPF</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Atualizar RGs</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Atualizar Telefones</button>
                    </div>
                )}

                
                {mostrarListagens && (
                    <div className="flex flex-wrap p-4 gap-4 justify-center">
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Listagem Geral</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Listagem por Gênero</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Maiores Consumidores</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Menores Consumidores</button>
                        <button className="flex justify-center items-center text-white px-4 py-2 rounded-lg h-12 w-full max-w-xs hover:bg-sky-600 transition bg-sky-500 shadow">Top 5 (Valor)</button>
                    </div>
                )}
                
                <Modal isOpen={modalAberto} onClose={fecharModal}>
                    {modalConteudo}
                </Modal>
            </div>
        </>
    );
};

export default Clientes;