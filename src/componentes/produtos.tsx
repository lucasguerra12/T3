import React, { useState } from "react";
import { ArrowLeftIcon, ListBulletIcon, ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/solid"
import Modal from "./Modal"
import { Produto } from "./roteador";

type Props = {
    tema: string
    produtos: Produto[]
    setProdutos: (produtos: Produto[]) => void
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
}

const Produtos: React.FC<Props> = ({ tema, produtos, setProdutos, seletorView }) => {
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

    const handleAtualizarProduto = () => {

        const produtoExiste = produtos.find(p => p.nome.toLowerCase() === nomeAtualizacao.toLowerCase());
        if (!produtoExiste) {
            alert('Produto com o nome informado não encontrado.');
            return;
        }
        
        const produtosAtualizados = produtos.map(p => {
            if (p.nome.toLowerCase() === nomeAtualizacao.toLowerCase()) {
                return { ...p, valor: novoValor || p.valor };
            }
            return p;
        });
        setProdutos(produtosAtualizados);
        alert('Produto atualizado com sucesso!');
        fecharModal();
    };
    
    const handleExcluirProduto = () => {
        const produtoExiste = produtos.find(p => p.nome.toLowerCase() === nomeExclusao.toLowerCase());
        if (!produtoExiste) {
            alert('Produto com o nome informado não encontrado.');
            return;
        }

        const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase() !== nomeExclusao.toLowerCase());
        setProdutos(produtosFiltrados);
        alert('Produto excluído com sucesso!');
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
                        <button
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() => setModalVisivel('atualizar')}
                        >
                            <ShoppingBagIcon className="h-16 w-16 mb-4" />
                            Atualizar Produto
                        </button>
                        <button
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() => setModalVisivel('excluir')}
                        >
                            <TrashIcon className="h-16 w-16 mb-4" />
                            Excluir Produto
                        </button>
                        <button onClick={() => setModalVisivel('listar')} className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">
                            <ListBulletIcon className="h-16 w-16 mb-4" />
                            Listagem
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalVisivel !== 'nenhum'} onClose={fecharModal}>
                    {modalVisivel === 'atualizar' && (
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <h2 className="text-xl font-bold">Atualizar Produto</h2>

                            
                            <label className={labelStyle} htmlFor="produto_nome_att">Nome do Produto</label>
                            <input id="produto_nome_att" className={inputStyle} type="text" placeholder="Digite o nome do produto" value={nomeAtualizacao} onChange={e => setNomeAtualizacao(e.target.value)} />
                            
                            <label className={labelStyle} htmlFor="produto_valor_att">Novo Valor</label>
                            <input id="produto_valor_att" className={inputStyle} type="text" placeholder="Deixe em branco para não alterar" value={novoValor} onChange={e => setNovoValor(e.target.value)} />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleAtualizarProduto} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Confirmar</button>
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'excluir' && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Excluir Produto</h2>
                            
                        
                            <label className={labelStyle} htmlFor="produto_nome_del">Nome do Produto</label>
                            <input id="produto_nome_del" className={inputStyle} type="text" placeholder="Digite o nome do produto a excluir" value={nomeExclusao} onChange={e => setNomeExclusao(e.target.value)} />
                            
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleExcluirProduto} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Confirmar Exclusão</button>
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'listar' && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Lista de Produtos</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4">Código</th>
                                            <th className="py-2 px-4">Nome</th>
                                            <th className="py-2 px-4">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos.map((produto, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-2 px-4">{produto.codigo}</td>
                                                <td className="py-2 px-4">{produto.nome}</td>
                                                <td className="py-2 px-4">R$ {produto.valor}</td>
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

export default Produtos;