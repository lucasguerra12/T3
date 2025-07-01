import React, { useState } from "react";
import Modal from "./Modal";
import { ArrowLeftIcon, ArrowRightIcon, ScissorsIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/solid";

type Props = {
    tema: string,
    seletorView: (novaTela: string, evento: React.MouseEvent) => void
}

// Componente para o Modal de Cadastro de Cliente (multi-etapas)
function CadastroClienteModal({ onClose }: { onClose: () => void }) {
    const [etapa, setEtapa] = useState(1);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [servicoSelecionado, setServicoSelecionado] = useState("");

    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

    return (
        <div className="flex flex-col p-4 sm:p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Cliente</h2>
            <form className="w-full">
                {etapa === 1 && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Etapa 1 de 2: Dados Pessoais</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className={labelStyle} htmlFor="nome">Nome <span className="text-red-600">*</span></label>
                                <input className={inputStyle} id="nome" type="text" />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="cpf">CPF <span className="text-red-600">*</span></label>
                                <input className={inputStyle} id="cpf" type="text" />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="rg">RG</label>
                                <input className={inputStyle} id="rg" type="text" />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="telefone">Telefone</label>
                                <input className={inputStyle} id="telefone" type="text" />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="email">E-mail</label>
                                <input className={inputStyle} id="email" type="email" />
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="genero">Gênero <span className="text-red-600">*</span></label>
                                <select id="genero" className={inputStyle} defaultValue="">
                                    <option value="" disabled>Selecione o gênero</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition" onClick={() => setEtapa(2)}>
                                Avançar <ArrowRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </>
                )}
                {etapa === 2 && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-600 mb-4">Etapa 2 de 2: Consumo Inicial</h3>
                        <div className="flex flex-col gap-6 mb-6">
                            <div>
                                <label className={labelStyle} htmlFor="produtos">Produto</label>
                                <select id="produtos" value={produtoSelecionado} onChange={e => setProdutoSelecionado(e.target.value)} className={inputStyle}>
                                    <option value="" disabled>Selecione um produto</option>
                                    <option value="produto1">Produto 1</option>
                                    <option value="produto2">Produto 2</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle} htmlFor="servicos">Serviço</label>
                                <select id="servicos" value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)} className={inputStyle}>
                                    <option value="" disabled>Selecione um serviço</option>
                                    <option value="servico1">Serviço 1</option>
                                    <option value="servico2">Serviço 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-4">
                            Para adicionar mais produtos ou serviços, utilize a opção de atualização de cliente após o cadastro.
                        </div>
                        <div className="flex justify-between gap-4">
                            <button type="button" className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition" onClick={() => setEtapa(1)}>
                                <ArrowLeftIcon className="h-5 w-5" /> Voltar
                            </button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition">
                                Finalizar Cadastro
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

// Componente principal da página de cadastros
const FormularioCadastro: React.FC<Props> = ({ tema, seletorView }) => {
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
            <h5 className="text-center text-lg md:text-2xl lg:text-3xl font-semibold p-4 md:p-6 pt-8 md:pt-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Bem-vindo ao cadastro do <span className="ml-2 font-bold italic">Grupo World Beauty</span>
            </h5>
            <div className="w-full flex justify-center bg-sky-100 min-h-screen p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => abrirModal(<CadastroClienteModal onClose={fecharModal} />)}>
                        <UserCircleIcon className="h-16 w-16 mb-4" />
                        Cadastro Cliente
                    </button>
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => abrirModal(
                        <div className="flex flex-col p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Produto</h2>
                            <form className="w-full">
                                <div className="mb-4">
                                    <label className={labelStyle} htmlFor="produto_nome">Nome</label>
                                    <input className={inputStyle} id="produto_nome" type="text" />
                                </div>
                                <div className="mb-6">
                                    <label className={labelStyle} htmlFor="produto_valor">Valor</label>
                                    <input className={inputStyle} id="produto_valor" type="text" />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button type="button" onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Finalizar Cadastro</button>
                                </div>
                            </form>
                        </div>
                    )}>
                        <ShoppingBagIcon className="h-16 w-16 mb-4" />
                        Cadastro Produto
                    </button>
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => abrirModal(
                        <div className="flex flex-col p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
                            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Serviço</h2>
                            <form className="w-full">
                                <div className="mb-4">
                                    <label className={labelStyle} htmlFor="servico_nome">Nome</label>
                                    <input className={inputStyle} id="servico_nome" type="text" />
                                </div>
                                <div className="mb-6">
                                    <label className={labelStyle} htmlFor="servico_valor">Valor</label>
                                    <input className={inputStyle} id="servico_valor" type="text" />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button type="button" onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Finalizar Cadastro</button>
                                </div>
                            </form>
                        </div>
                    )}>
                        <ScissorsIcon className="h-16 w-16 mb-4" />
                        Cadastro Serviços
                    </button>
                </div>
            </div>
            <Modal isOpen={modalAberto} onClose={fecharModal}>
                {modalConteudo}
            </Modal>
        </>
    );
};

export default FormularioCadastro;