import React, { useState } from "react";
import Modal from "./Modal";
import { ScissorsIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Cliente, Produto, Servico } from "./roteador";

type Props = {
    tema: string,
    clientes: Cliente[],
    produtos: Produto[],
    servicos: Servico[],
    setClientes: (clientes: Cliente[]) => void,
    setProdutos: (produtos: Produto[]) => void,
    setServicos: (servicos: Servico[]) => void,
}

function CadastroClienteModal({ onClose, clientes, setClientes }: { onClose: () => void, clientes: Cliente[], setClientes: (clientes: Cliente[]) => void }) {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [genero, setGenero] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const novoCliente: Cliente = { nome, cpf, rg, telefone, email, genero, produtosConsumidos: [], servicosConsumidos: [] };
        setClientes([...clientes, novoCliente]);
        alert('Cliente cadastrado com sucesso!');
        onClose();
    };
    
    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

    return (
        <div className="flex flex-col p-4 sm:p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Cliente</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className={labelStyle} htmlFor="nome">Nome <span className="text-red-600">*</span></label>
                        <input className={inputStyle} id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="cpf">CPF <span className="text-red-600">*</span></label>
                        <input className={inputStyle} id="cpf" type="text" value={cpf} onChange={e => setCpf(e.target.value)} required />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="rg">RG</label>
                        <input className={inputStyle} id="rg" type="text" value={rg} onChange={e => setRg(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="telefone">Telefone</label>
                        <input className={inputStyle} id="telefone" type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="email">E-mail</label>
                        <input className={inputStyle} id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="genero">Gênero <span className="text-red-600">*</span></label>
                        <select id="genero" className={inputStyle} value={genero} onChange={e => setGenero(e.target.value)} required>
                            <option value="" disabled>Selecione o gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Finalizar Cadastro</button>
                </div>
            </form>
        </div>
    );
}

function CadastroProdutoModal({ onClose, produtos, setProdutos }: { onClose: () => void, produtos: Produto[], setProdutos: (produtos: Produto[]) => void }) {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // MUDANÇA: Objeto criado sem o campo 'codigo'
        const novoProduto: Produto = { nome, valor };
        setProdutos([...produtos, novoProduto]);
        alert('Produto cadastrado com sucesso!');
        onClose();
    }

    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Produto</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className={labelStyle} htmlFor="produto_nome">Nome</label>
                    <input className={inputStyle} id="produto_nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className={labelStyle} htmlFor="produto_valor">Valor</label>
                    <input className={inputStyle} id="produto_valor" type="text" value={valor} onChange={e => setValor(e.target.value)} />
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Finalizar Cadastro</button>
                </div>
            </form>
        </div>
    )
}

function CadastroServicoModal({ onClose, servicos, setServicos }: { onClose: () => void, servicos: Servico[], setServicos: (servicos: Servico[]) => void }) {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // MUDANÇA: Objeto criado sem o campo 'codigo'
        const novoServico: Servico = { nome, valor };
        setServicos([...servicos, novoServico]);
        alert('Serviço cadastrado com sucesso!');
        onClose();
    }
    
    const inputStyle = "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500";
    const labelStyle = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de Serviço</h2>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className={labelStyle} htmlFor="servico_nome">Nome</label>
                    <input className={inputStyle} id="servico_nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className={labelStyle} htmlFor="servico_valor">Valor</label>
                    <input className={inputStyle} id="servico_valor" type="text" value={valor} onChange={e => setValor(e.target.value)} />
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Finalizar Cadastro</button>
                </div>
            </form>
        </div>
    )
}

const FormularioCadastro: React.FC<Props> = ({ tema, clientes, produtos, servicos, setClientes, setProdutos, setServicos }) => {
    const [modalVisivel, setModalVisivel] = useState<'nenhum' | 'cliente' | 'produto' | 'servico'>('nenhum');

    const fecharModal = () => {
        setModalVisivel('nenhum');
    };
    
    return (
        <>
            <div className="w-full flex justify-center bg-sky-100 min-h-screen p-4 pt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => setModalVisivel('cliente')}>
                        <UserCircleIcon className="h-16 w-16 mb-4" />
                        Cadastro Cliente
                    </button>
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => setModalVisivel('produto')}>
                        <ShoppingBagIcon className="h-16 w-16 mb-4" />
                        Cadastro Produto
                    </button>
                    <button className="flex flex-col justify-center items-center px-4 py-2 rounded-lg h-52 w-full text-white font-semibold hover:bg-blue-700 transition bg-blue-500 shadow-md" onClick={() => setModalVisivel('servico')}>
                        <ScissorsIcon className="h-16 w-16 mb-4" />
                        Cadastro Serviços
                    </button>
                </div>
            </div>
            
            <Modal isOpen={modalVisivel !== 'nenhum'} onClose={fecharModal}>
                {modalVisivel === 'cliente' && <CadastroClienteModal onClose={fecharModal} clientes={clientes} setClientes={setClientes} />}
                {modalVisivel === 'produto' && <CadastroProdutoModal onClose={fecharModal} produtos={produtos} setProdutos={setProdutos} />}
                {modalVisivel === 'servico' && <CadastroServicoModal onClose={fecharModal} servicos={servicos} setServicos={setServicos} />}
            </Modal>
        </>
    );
};

export default FormularioCadastro;