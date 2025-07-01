import React, { useState } from "react";
import { ArrowLeftIcon, ListBulletIcon, ScissorsIcon, TrashIcon } from "@heroicons/react/24/solid"
import Modal from "./Modal"
import { Servico } from "./roteador";

type Props = {
    tema: string
    servicos: Servico[]
    setServicos: (servicos: Servico[]) => void
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
}

const Servicos: React.FC<Props> = ({ tema, servicos, setServicos, seletorView }) => {
    const [modalVisivel, setModalVisivel] = useState<'nenhum' | 'atualizar' | 'excluir' | 'listar'>('nenhum');
    const [nomeAtualizacao, setNomeAtualizacao] = useState('');
    const [novoValor, setNovoValor] = useState('');
    const [nomeExclusao, setNomeExclusao] = useState('');

    const fecharModal = () => {
        setModalVisivel('nenhum');
        setNomeAtualizacao('');
        setNovoValor('');
        setNomeExclusao('');
    };

    const handleAtualizarServico = () => {
        const servicoExiste = servicos.find(s => s.nome.toLowerCase() === nomeAtualizacao.toLowerCase());
        if (!servicoExiste) {
            alert('Serviço com o nome informado não encontrado.');
            return;
        }

        const servicosAtualizados = servicos.map(s => {
            if (s.nome.toLowerCase() === nomeAtualizacao.toLowerCase()) {
                return { ...s, valor: novoValor || s.valor };
            }
            return s;
        });
        setServicos(servicosAtualizados);
        alert('Serviço atualizado com sucesso!');
        fecharModal();
    };
    
    const handleExcluirServico = () => {
        const servicoExiste = servicos.find(s => s.nome.toLowerCase() === nomeExclusao.toLowerCase());
        if (!servicoExiste) {
            alert('Serviço com o nome informado não encontrado.');
            return;
        }

        const servicosFiltrados = servicos.filter(s => s.nome.toLowerCase() !== nomeExclusao.toLowerCase());
        setServicos(servicosFiltrados);
        alert('Serviço excluído com sucesso!');
        fecharModal();
    };

    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

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
                <div className="w-full flex justify-center p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
                        <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => setModalVisivel('atualizar')}><ScissorsIcon className="h-16 w-16 mb-4" />Atualizar Serviço</button>
                        <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => setModalVisivel('excluir')}><TrashIcon className="h-16 w-16 mb-4" />Excluir Serviço</button>
                        <button onClick={() => setModalVisivel('listar')} className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"><ListBulletIcon className="h-16 w-16 mb-4" />Listagem</button>
                    </div>
                </div>
                <Modal isOpen={modalVisivel !== 'nenhum'} onClose={fecharModal}>
                    {modalVisivel === 'atualizar' && (
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <h2 className="text-xl font-bold">Atualizar Serviço</h2>
                            <label className={labelStyle} htmlFor="servico_nome_att">Nome do Serviço</label>
                            <input id="servico_nome_att" className={inputStyle} type="text" placeholder="Digite o nome do serviço" value={nomeAtualizacao} onChange={e => setNomeAtualizacao(e.target.value)} />
                            <label className={labelStyle} htmlFor="servico_valor_att">Novo Valor</label>
                            <input id="servico_valor_att" className={inputStyle} type="text" placeholder="Deixe em branco para não alterar" value={novoValor} onChange={e => setNovoValor(e.target.value)} />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleAtualizarServico} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Confirmar</button>
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'excluir' && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Excluir Serviço</h2>
                            <label className={labelStyle} htmlFor="servico_nome_del">Nome do Serviço</label>
                            <input id="servico_nome_del" className={inputStyle} type="text" placeholder="Digite o nome do serviço a excluir" value={nomeExclusao} onChange={e => setNomeExclusao(e.target.value)} />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleExcluirServico} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Confirmar Exclusão</button>
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'listar' && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Lista de Serviços</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    {/* MUDANÇA: Coluna 'Código' removida */}
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4">Nome</th>
                                            <th className="py-2 px-4">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicos.map((servico) => (
                                            // MUDANÇA: A 'key' agora é o nome do serviço
                                            <tr key={servico.nome} className="border-b">
                                                <td className="py-2 px-4">{servico.nome}</td>
                                                <td className="py-2 px-4">R$ {servico.valor}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Fechar</button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
};

export default Servicos;