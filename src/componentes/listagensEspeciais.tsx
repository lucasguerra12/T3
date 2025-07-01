import React, { useState, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Modal from "./Modal";
import { Cliente, Produto, Servico } from "./roteador";

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
    clientes: Cliente[]
    produtos: Produto[]
    servicos: Servico[]
}

type ClienteConsumoQuantidade = Cliente & { totalConsumido: number };
type ClienteConsumoValor = Cliente & { totalGasto: number };

const ListagensEspeciais: React.FC<Props> = ({ tema, seletorView, clientes, produtos, servicos }) => {
    const [modalVisivel, setModalVisivel] = useState<string | null>(null);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroGenero, setFiltroGenero] = useState<'Todos' | 'Feminino' | 'Masculino'>('Todos');

    const clientesFiltradosPorNome = useMemo(() => 
        clientes.filter(c => c.nome.toLowerCase().includes(filtroNome.toLowerCase())),
        [clientes, filtroNome]
    );

    const clientesFiltradosPorGenero = useMemo(() => {
        if (filtroGenero === 'Todos') return clientes;
        return clientes.filter(c => c.genero === filtroGenero);
    }, [clientes, filtroGenero]);

    const clientesPorQuantidade = useMemo((): ClienteConsumoQuantidade[] => 
        clientes.map(cliente => ({
            ...cliente,
            totalConsumido: cliente.produtosConsumidos.length + cliente.servicosConsumidos.length
        })).sort((a, b) => b.totalConsumido - a.totalConsumido),
        [clientes]
    );

    const top10MaisConsumiram = clientesPorQuantidade.slice(0, 10);
    const top10MenosConsumiram = [...clientesPorQuantidade].reverse().slice(0, 10);

    const clientesPorValor = useMemo((): ClienteConsumoValor[] => {
        // MUDANÇA: O mapa de preços agora usa o NOME como chave
        const mapaPrecos = new Map<string, number>();
        produtos.forEach(p => mapaPrecos.set(p.nome, parseFloat(p.valor)));
        servicos.forEach(s => mapaPrecos.set(s.nome, parseFloat(s.valor)));

        return clientes.map(cliente => {
            // A lógica de cálculo funciona, pois agora busca o preço pelo nome
            const gastoProdutos = cliente.produtosConsumidos.reduce((total, nomeProduto) => total + (mapaPrecos.get(nomeProduto) || 0), 0);
            const gastoServicos = cliente.servicosConsumidos.reduce((total, nomeServico) => total + (mapaPrecos.get(nomeServico) || 0), 0);
            return {
                ...cliente,
                totalGasto: gastoProdutos + gastoServicos
            }
        }).sort((a, b) => b.totalGasto - a.totalGasto);
    }, [clientes, produtos, servicos]);

    const top5MaisGastaram = clientesPorValor.slice(0, 5);
    
    const fecharModal = () => setModalVisivel(null);

    const renderTabelaClientes = (lista: Cliente[]) => (
        <table className="min-w-full bg-white">
            <thead className="bg-blue-500 text-white"><tr><th className="p-2">Nome</th><th className="p-2">Gênero</th><th className="p-2">Email</th></tr></thead>
            <tbody>{lista.map(c => <tr key={c.cpf} className="border-b"><td className="p-2">{c.nome}</td><td className="p-2">{c.genero}</td><td className="p-2">{c.email}</td></tr>)}</tbody>
        </table>
    );

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
                        <button onClick={() => setModalVisivel('filtroNome')} className="p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">Listar Clientes por Nome</button>
                        <button onClick={() => setModalVisivel('filtroGenero')} className="p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">Listar Clientes por Gênero</button>
                        <button onClick={() => setModalVisivel('top10Mais')} className="p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">Top 10 Consumidores (Qtd)</button>
                        <button onClick={() => setModalVisivel('top10Menos')} className="p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">Top 10 Menos Consumidores (Qtd)</button>
                        <button onClick={() => setModalVisivel('top5Valor')} className="p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md">Top 5 Consumidores (Valor)</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalVisivel !== null} onClose={fecharModal}>
                <div className="p-4 bg-white rounded-lg shadow-xl w-[90vw] max-w-4xl">
                    {modalVisivel === 'filtroNome' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Listar Clientes por Nome</h2>
                            <input type="text" placeholder="Digite um nome para filtrar..." value={filtroNome} onChange={e => setFiltroNome(e.target.value)} className="w-full p-2 border rounded mb-4"/>
                            <div className="overflow-y-auto max-h-[60vh]">
                                {renderTabelaClientes(clientesFiltradosPorNome)}
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'filtroGenero' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Listar Clientes por Gênero</h2>
                            <div className="flex gap-4 mb-4">
                                <label><input type="radio" value="Todos" checked={filtroGenero === 'Todos'} onChange={() => setFiltroGenero('Todos')} /> Todos</label>
                                <label><input type="radio" value="Feminino" checked={filtroGenero === 'Feminino'} onChange={() => setFiltroGenero('Feminino')} /> Feminino</label>
                                <label><input type="radio" value="Masculino" checked={filtroGenero === 'Masculino'} onChange={() => setFiltroGenero('Masculino')} /> Masculino</label>
                            </div>
                            <div className="overflow-y-auto max-h-[60vh]">
                                {renderTabelaClientes(clientesFiltradosPorGenero)}
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'top10Mais' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Top 10 Clientes que Mais Consumiram (Quantidade)</h2>
                             <div className="overflow-y-auto max-h-[60vh]">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-500 text-white"><tr><th className="p-2">Posição</th><th className="p-2">Nome</th><th className="p-2">Qtd. Consumida</th></tr></thead>
                                    <tbody>{top10MaisConsumiram.map((c, i) => <tr key={c.cpf} className="border-b"><td className="p-2">{i + 1}º</td><td className="p-2">{c.nome}</td><td className="p-2">{c.totalConsumido}</td></tr>)}</tbody>
                                </table>
                            </div>
                        </div>
                    )}
                     {modalVisivel === 'top10Menos' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Top 10 Clientes que Menos Consumiram (Quantidade)</h2>
                             <div className="overflow-y-auto max-h-[60vh]">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-500 text-white"><tr><th className="p-2">Posição</th><th className="p-2">Nome</th><th className="p-2">Qtd. Consumida</th></tr></thead>
                                    <tbody>{top10MenosConsumiram.map((c, i) => <tr key={c.cpf} className="border-b"><td className="p-2">{i + 1}º</td><td className="p-2">{c.nome}</td><td className="p-2">{c.totalConsumido}</td></tr>)}</tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {modalVisivel === 'top5Valor' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Top 5 Clientes que Mais Consumiram (Valor)</h2>
                             <div className="overflow-y-auto max-h-[60vh]">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-500 text-white"><tr><th className="p-2">Posição</th><th className="p-2">Nome</th><th className="p-2">Valor Gasto</th></tr></thead>
                                    <tbody>{top5MaisGastaram.map((c, i) => <tr key={c.cpf} className="border-b"><td className="p-2">{i + 1}º</td><td className="p-2">{c.nome}</td><td className="p-2">{c.totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td></tr>)}</tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-4">
                        <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Fechar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ListagensEspeciais;