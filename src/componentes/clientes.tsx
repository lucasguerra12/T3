import React, { useState } from "react";
import { ArrowLeftIcon, ListBulletIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Modal from "./Modal"
import { Cliente } from "./roteador";

type Props = {
    tema: string
    clientes: Cliente[]
    setClientes: (clientes: Cliente[]) => void
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
}

const Clientes: React.FC<Props> = ({ tema, clientes, setClientes, seletorView }) => {
    const [modalVisivel, setModalVisivel] = useState<'nenhum' | 'atualizar' | 'excluir' | 'listar'>('nenhum');
    const [nomeAtualizacao, setNomeAtualizacao] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novoTelefone, setNovoTelefone] = useState(''); 
    const [nomeExclusao, setNomeExclusao] = useState('');
    const fecharModal = () => {
        setModalVisivel('nenhum');
        setNomeAtualizacao('');
        setNovoEmail('');
        setNovoTelefone('');
        setNomeExclusao('');
    };
    
    const handleAtualizarCliente = () => {    
        const clienteExiste = clientes.find(c => c.nome.toLowerCase() === nomeAtualizacao.toLowerCase());
        if (!clienteExiste) {
            alert('Cliente com o nome informado não encontrado.');
            return;
        }

        const clientesAtualizados = clientes.map(c => {
            if (c.nome.toLowerCase() === nomeAtualizacao.toLowerCase()) {     
                return { 
                    ...c, 
                    email: novoEmail || c.email,
                    telefone: novoTelefone || c.telefone
                };
            }
            return c;
        });
        setClientes(clientesAtualizados);
        alert('Cliente atualizado com sucesso!');
        fecharModal();
    };
    
    const handleExcluirCliente = () => {     
        const clienteExiste = clientes.find(c => c.nome.toLowerCase() === nomeExclusao.toLowerCase());
        if (!clienteExiste) {
            alert('Cliente com o nome informado não encontrado.');
            return;
        }
        const clientesFiltrados = clientes.filter(c => c.nome.toLowerCase() !== nomeExclusao.toLowerCase());
        setClientes(clientesFiltrados);
        alert('Cliente excluído com sucesso!');
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
                            <UserCircleIcon className="h-16 w-16 mb-4" />
                            Atualizar Cliente
                        </button>
                        <button
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() => setModalVisivel('excluir')}
                        >
                            <TrashIcon className="h-16 w-16 mb-4" />
                            Excluir Cliente
                        </button>
                        <button 
                            className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md"
                            onClick={() => setModalVisivel('listar')}>
                            <ListBulletIcon className="h-16 w-16 mb-4" />
                            Listagem
                        </button>
                    </div>
                </div>

                {/* O Modal único que renderiza o conteúdo certo com base no estado 'modalVisivel' */}
                <Modal isOpen={modalVisivel !== 'nenhum'} onClose={fecharModal}>                
                    {modalVisivel === 'atualizar' && (
                        <div className="flex flex-col gap-4 p-4 w-full max-w-md">
                            <h2 className="text-xl font-bold">Atualizar Cliente</h2>
                            
                            <label className={labelStyle} htmlFor="cliente_nome_att">Nome do Cliente</label>
                            <input id="cliente_nome_att" className={inputStyle} type="text" placeholder="Digite o nome completo do cliente" value={nomeAtualizacao} onChange={e => setNomeAtualizacao(e.target.value)} />

                            <label className={labelStyle} htmlFor="cliente_email_att">Novo E-mail</label>
                            <input id="cliente_email_att" className={inputStyle} type="email" placeholder="Deixe em branco para não alterar" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} />
                            <label className={labelStyle} htmlFor="cliente_tel_att">Novo Telefone</label>
                            <input id="cliente_tel_att" className={inputStyle} type="text" placeholder="Deixe em branco para não alterar" value={novoTelefone} onChange={e => setNovoTelefone(e.target.value)} />
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleAtualizarCliente} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Confirmar</button>
                            </div>
                        </div>
                    )}

                  
                    {modalVisivel === 'excluir' && (
                         <div className="flex flex-col gap-4 p-4">
                            <h2 className="text-xl font-bold">Excluir Cliente</h2>
                            
                            <label className={labelStyle} htmlFor="cliente_nome_del">Nome do Cliente</label>
                            <input id="cliente_nome_del" className={inputStyle} type="text" placeholder="Digite o nome completo do cliente" value={nomeExclusao} onChange={e => setNomeExclusao(e.target.value)} />
                            
                            <p className="text-red-500 text-sm mt-2">Atenção: Esta ação é irreversível.</p>
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                                <button onClick={handleExcluirCliente} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Confirmar Exclusão</button>
                            </div>
                        </div>
                    )}

                    
                    {modalVisivel === 'listar' && (
                        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-xl max-w-4xl w-full">
                            <h2 className="text-2xl font-bold text-center text-gray-800">Lista de Clientes</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="py-2 px-4 text-left">Nome</th>
                                            <th className="py-2 px-4 text-left">CPF</th>
                                            <th className="py-2 px-4 text-left">E-mail</th>
                                            <th className="py-2 px-4 text-left">Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes.map((cliente, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100">
                                                <td className="py-2 px-4">{cliente.nome}</td>
                                                <td className="py-2 px-4">{cliente.cpf}</td>
                                                <td className="py-2 px-4">{cliente.email}</td>
                                                <td className="py-2 px-4">{cliente.telefone}</td>
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

export default Clientes;