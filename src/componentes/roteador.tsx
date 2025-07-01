import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastro from "./formularioCadastro";
import PaginaPrincipal from "./home";
import Clientes from "./clientes";
import Produtos from "./produtos";
import Servicos from "./servicos";
import ListagensEspeciais from "./listagensEspeciais";

// Tipos para nossos dados
export type Cliente = {
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    email: string;
    genero: 'Feminino' | 'Masculino' | string; // Gênero pode ser uma dessas strings
    produtosConsumidos: string[]; // Array de códigos de produtos
    servicosConsumidos: string[]; // Array de códigos de serviços
};

export type Produto = {
    codigo: string;
    nome: string;
    valor: string;
};

export type Servico = {
    codigo: string;
    nome: string;
    valor: string;
};

const Roteador: React.FC = () => {
    const [tela, setTela] = useState('Home');

    // Estado centralizado para clientes, produtos e serviços
    const [clientes, setClientes] = useState<Cliente[]>([
        // Dados de exemplo
        { nome: 'Ana Silva', cpf: '111.111.111-11', rg: '1234567', telefone: '12-91234-5678', email: 'ana@email.com', genero: 'Feminino', produtosConsumidos: ['P01', 'P01', 'P02'], servicosConsumidos: ['S01'] },
        { nome: 'Bruno Costa', cpf: '222.222.222-22', rg: '7654321', telefone: '12-98765-4321', email: 'bruno@email.com', genero: 'Masculino', produtosConsumidos: ['P02'], servicosConsumidos: [] },
        { nome: 'Carla Dias', cpf: '333.333.333-33', rg: '1122334', telefone: '12-91111-2222', email: 'carla@email.com', genero: 'Feminino', produtosConsumidos: ['P01', 'P02', 'P02', 'P02'], servicosConsumidos: ['S01', 'S02'] }
    ]);
    const [produtos, setProdutos] = useState<Produto[]>([
        // Dados de exemplo
        { codigo: 'P01', nome: 'Shampoo Hidratante', valor: '35.50' },
        { codigo: 'P02', nome: 'Condicionador Reparador', valor: '40.00' }
    ]);
    const [servicos, setServicos] = useState<Servico[]>([
        // Dados de exemplo
        { codigo: 'S01', nome: 'Corte de Cabelo', valor: '80.00' },
        { codigo: 'S02', nome: 'Manicure', valor: '50.00' }
    ]);

    const handleSetClientes = (novosClientes: Cliente[]) => {
        setClientes(novosClientes);
    };

    const handleSetProdutos = (novosProdutos: Produto[]) => {
        setProdutos(novosProdutos);
    };
    
    const handleSetServicos = (novosServicos: Servico[]) => {
        setServicos(novosServicos);
    };

    const selecionarView = (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => {
        evento.preventDefault();
        setTela(novaTela);
    };

    const barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="purple lighten-4" botoes={['Home', 'Cadastros', 'Clientes', 'Produtos', 'Serviços', 'Listagens']} />;

    if (tela === 'Home') {
        return (
            <>
                {barraNavegacao}
                <PaginaPrincipal tema="purple lighten-4" seletorView={selecionarView} />
            </>
        );
    } else if (tela === 'Cadastros') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastro
                    tema="purple lighten-4"
                    clientes={clientes}
                    produtos={produtos}
                    servicos={servicos}
                    setClientes={handleSetClientes}
                    setProdutos={handleSetProdutos}
                    setServicos={handleSetServicos}
                />
            </>
        );
    } else if (tela === 'Clientes') {
        return (
            <>
                {barraNavegacao}
                <Clientes
                    tema="purple lighten-4"
                    clientes={clientes}
                    setClientes={handleSetClientes}
                    seletorView={selecionarView}
                />
            </>
        );
    } else if (tela === 'Produtos') {
        return (
            <>
                {barraNavegacao}
                <Produtos
                    tema="purple lighten-4"
                    produtos={produtos}
                    setProdutos={handleSetProdutos}
                    seletorView={selecionarView}
                />
            </>
        );
    } else if (tela === 'Serviços') {
        return (
            <>
                {barraNavegacao}
                <Servicos
                    tema="purple lighten-4"
                    servicos={servicos}
                    setServicos={handleSetServicos}
                    seletorView={selecionarView}
                />
            </>
        );
    } else { // 'Listagens'
        return (
            <>
                {barraNavegacao}
                {/* MUDANÇA: Passando todos os dados para a tela de listagens */}
                <ListagensEspeciais 
                    tema="purple lighten-4"
                    seletorView={selecionarView}
                    clientes={clientes}
                    produtos={produtos}
                    servicos={servicos}
                />
            </>
        );
    }
};

export default Roteador;