import React, { useState } from "react";
import { ArrowLeftIcon, ListBulletIcon, ScissorsIcon, TrashIcon } from "@heroicons/react/24/solid"
import Modal from "./Modal"

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: React.MouseEvent) => void
}

const Servicos: React.FC<Props> = ({ tema, seletorView }) => {
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

    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

    return (
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
                        <button
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() =>
                                abrirModal(
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-xl font-bold">Atualizar Serviço</h2>

                                        <label className={labelStyle} htmlFor="servico_codigo_att">Código do Serviço</label>
                                        <input id="servico_codigo_att" className={inputStyle} type="text" placeholder="Insira o código do serviço" />

                                        <label className={labelStyle} htmlFor="servico_nome_att">Novo Nome</label>
                                        <input id="servico_nome_att" className={inputStyle} type="text" />

                                        <label className={labelStyle} htmlFor="servico_valor_att">Novo Valor</label>
                                        <input id="servico_valor_att" className={inputStyle} type="text" />

                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                                                Cancelar
                                            </button>
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        >
                            <ScissorsIcon className="h-16 w-16 mb-4" />
                            Atualizar Serviço
                        </button>
                        <button
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() =>
                                abrirModal(
                                    <div className="flex flex-col gap-4">
                                        <h2 className="text-xl font-bold">Excluir Serviço</h2>

                                        <label className={labelStyle} htmlFor="servico_codigo_del">Código do Serviço</label>
                                        <input id="servico_codigo_del" className={inputStyle} type="text" placeholder="Insira o código do serviço" />

                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">
                                                Cancelar
                                            </button>
                                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                                Confirmar Exclusão
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        >
                            <TrashIcon className="h-16 w-16 mb-4" />
                            Excluir Serviço
                        </button>
                        <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">
                            <ListBulletIcon className="h-16 w-16 mb-4" />
                            Listagem
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalAberto} onClose={fecharModal}>
                    {modalConteudo}
                </Modal>
            </div>
        </>
    );
};

export default Servicos;