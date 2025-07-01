import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastro from "./formularioCadastro";
import PaginaPrincipal from "./home";
import Clientes from "./clientes";
import Produtos from "./produtos";
import Servicos from "./servicos";
import ListagensEspeciais from "./listagensEspeciais";


export type Cliente = {
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    email: string;
    genero: 'Feminino' | 'Masculino' | string;
    produtosConsumidos: string[];
    servicosConsumidos: string[];
};

export type Produto = {
    nome: string;
    valor: string;
};

export type Servico = {
    nome: string;
    valor: string;
};

const Roteador: React.FC = () => {
    const [tela, setTela] = useState('Home');

    // DADOS POPULADOS ---

    const [produtos, setProdutos] = useState<Produto[]>([
        { nome: 'Shampoo Hidratante', valor: '35.50' },
        { nome: 'Condicionador Reparador', valor: '40.00' },
        { nome: 'Máscara Capilar Nutritiva', valor: '55.00' },
        { nome: 'Óleo de Argan Finalizador', valor: '75.90' },
        { nome: 'Protetor Térmico', valor: '45.00' },
        { nome: 'Mousse Modelador', valor: '38.50' },
        { nome: 'Esmalte Vermelho Intenso', valor: '15.00' },
        { nome: 'Base Fortalecedora de Unha', valor: '18.00' },
        { nome: 'Removedor de Esmalte', valor: '12.00' },
        { nome: 'Creme para Mãos', valor: '25.00' },
        { nome: 'Sabonete Líquido Esfoliante', valor: '32.00' },
        { nome: 'Loção Hidratante Corporal', valor: '48.00' },
        { nome: 'Batom Matte Nude', valor: '52.00' },
        { nome: 'Base Líquida Média Cobertura', valor: '85.00' },
        { nome: 'Pó Compacto Translúcido', valor: '65.00' },
        { nome: 'Delineador em Gel Preto', valor: '49.90' },
        { nome: 'Máscara de Cílios Volume', valor: '59.90' },
        { nome: 'Cera Depilatória', valor: '30.00' },
        { nome: 'Gel Pós-Depilação', valor: '28.00' },
        { nome: 'Pinça de Sobrancelha', valor: '22.00' }
    ]);

    const [servicos, setServicos] = useState<Servico[]>([
        { nome: 'Corte de Cabelo', valor: '80.00' },
        { nome: 'Manicure', valor: '50.00' },
        { nome: 'Pedicure', valor: '60.00' },
        { nome: 'Escova Progressiva', valor: '350.00' },
        { nome: 'Hidratação Profunda', valor: '150.00' },
        { nome: 'Design de Sobrancelha', valor: '45.00' },
        { nome: 'Maquiagem Social', valor: '250.00' },
        { nome: 'Limpeza de Pele', valor: '180.00' },
        { nome: 'Massagem Relaxante', valor: '200.00' },
        { nome: 'Depilação Completa', valor: '120.00' }
    ]);

    const [clientes, setClientes] = useState<Cliente[]>([
        { nome: 'Ana Silva', cpf: '111.111.111-11', rg: '1234567', telefone: '12-91234-5678', email: 'ana@email.com', genero: 'Feminino', produtosConsumidos: ['Shampoo Hidratante', 'Condicionador Reparador'], servicosConsumidos: ['Corte de Cabelo', 'Manicure'] },
        { nome: 'Bruno Costa', cpf: '222.222.222-22', rg: '7654321', telefone: '12-98765-4321', email: 'bruno@email.com', genero: 'Masculino', produtosConsumidos: ['Protetor Térmico'], servicosConsumidos: ['Corte de Cabelo'] },
        { nome: 'Carla Dias', cpf: '333.333.333-33', rg: '1122334', telefone: '12-91111-2222', email: 'carla@email.com', genero: 'Feminino', produtosConsumidos: ['Batom Matte Nude', 'Base Líquida Média Cobertura', 'Máscara de Cílios Volume'], servicosConsumidos: ['Maquiagem Social', 'Design de Sobrancelha'] },
        { nome: 'Daniel Farias', cpf: '444.444.444-44', rg: '4455667', telefone: '12-94444-5555', email: 'daniel@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: ['Massagem Relaxante'] },
        { nome: 'Eduarda Lima', cpf: '555.555.555-55', rg: '8899001', telefone: '12-95555-6666', email: 'eduarda@email.com', genero: 'Feminino', produtosConsumidos: ['Esmalte Vermelho Intenso', 'Removedor de Esmalte'], servicosConsumidos: ['Manicure', 'Pedicure', 'Manicure'] },
        { nome: 'Felipe Martins', cpf: '666.666.666-66', rg: '1122335', telefone: '12-96666-7777', email: 'felipe@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: ['Corte de Cabelo'] },
        { nome: 'Gabriela Oliveira', cpf: '777.777.777-77', rg: '2233445', telefone: '12-97777-8888', email: 'gabriela@email.com', genero: 'Feminino', produtosConsumidos: ['Máscara Capilar Nutritiva', 'Óleo de Argan Finalizador'], servicosConsumidos: ['Hidratação Profunda'] },
        { nome: 'Heitor Pereira', cpf: '888.888.888-88', rg: '5566778', telefone: '12-98888-9999', email: 'heitor@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Isabela Santos', cpf: '999.999.999-99', rg: '8899002', telefone: '12-99999-0000', email: 'isabela@email.com', genero: 'Feminino', produtosConsumidos: ['Creme para Mãos', 'Loção Hidratante Corporal', 'Sabonete Líquido Esfoliante'], servicosConsumidos: ['Limpeza de Pele'] },
        { nome: 'João Vitor', cpf: '101.010.101-01', rg: '3344556', telefone: '12-91010-1010', email: 'joao@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: ['Corte de Cabelo'] },
        { nome: 'Larissa Almeida', cpf: '121.212.121-21', rg: '6677889', telefone: '12-91212-1212', email: 'larissa@email.com', genero: 'Feminino', produtosConsumidos: ['Pinça de Sobrancelha'], servicosConsumidos: ['Design de Sobrancelha'] },
        { nome: 'Miguel Sousa', cpf: '131.313.131-31', rg: '9900112', telefone: '12-91313-1313', email: 'miguel@email.com', genero: 'Masculino', produtosConsumidos: ['Shampoo Hidratante'], servicosConsumidos: [] },
        { nome: 'Natália Ribeiro', cpf: '141.414.141-41', rg: '2233446', telefone: '12-91414-1414', email: 'natalia@email.com', genero: 'Feminino', produtosConsumidos: ['Cera Depilatória', 'Gel Pós-Depilação'], servicosConsumidos: ['Depilação Completa'] },
        { nome: 'Otávio Rocha', cpf: '151.515.151-51', rg: '5566779', telefone: '12-91515-1515', email: 'otavio@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Paula Fernandes', cpf: '161.616.161-61', rg: '8899003', telefone: '12-91616-1616', email: 'paula@email.com', genero: 'Feminino', produtosConsumidos: ['Máscara de Cílios Volume', 'Delineador em Gel Preto'], servicosConsumidos: [] },
        { nome: 'Quintino Borges', cpf: '171.717.171-71', rg: '1122337', telefone: '12-91717-1717', email: 'quintino@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: ['Corte de Cabelo'] },
        { nome: 'Rafaela Azevedo', cpf: '181.818.181-81', rg: '4455668', telefone: '12-91818-1818', email: 'rafaela@email.com', genero: 'Feminino', produtosConsumidos: ['Base Fortalecedora de Unha'], servicosConsumidos: ['Manicure'] },
        { nome: 'Sandro Moreira', cpf: '191.919.191-91', rg: '7788990', telefone: '12-91919-1919', email: 'sandro@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Tatiane Neves', cpf: '202.020.202-02', rg: '1122338', telefone: '12-92020-2020', email: 'tatiane@email.com', genero: 'Feminino', produtosConsumidos: ['Pó Compacto Translúcido'], servicosConsumidos: ['Maquiagem Social'] },
        { nome: 'Ulisses Guimarães', cpf: '212.121.212-12', rg: '4455669', telefone: '12-92121-2121', email: 'ulisses@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Vanessa Lopes', cpf: '232.323.232-32', rg: '7788991', telefone: '12-92323-2323', email: 'vanessa@email.com', genero: 'Feminino', produtosConsumidos: ['Mousse Modelador', 'Protetor Térmico'], servicosConsumidos: ['Escova Progressiva'] },
        { nome: 'William Bonner', cpf: '242.424.242-42', rg: '1122339', telefone: '12-92424-2424', email: 'william@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Xuxa Meneghel', cpf: '252.525.252-52', rg: '4455670', telefone: '12-92525-2525', email: 'xuxa@email.com', genero: 'Feminino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Yasmin Brunet', cpf: '262.626.262-62', rg: '7788992', telefone: '12-92626-2626', email: 'yasmin@email.com', genero: 'Feminino', produtosConsumidos: ['Óleo de Argan Finalizador'], servicosConsumidos: [] },
        { nome: 'Zeca Pagodinho', cpf: '272.727.272-72', rg: '1122340', telefone: '12-92727-2727', email: 'zeca@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Amanda Nunes', cpf: '282.828.282-82', rg: '4455671', telefone: '12-92828-2828', email: 'amanda@email.com', genero: 'Feminino', produtosConsumidos: [], servicosConsumidos: ['Massagem Relaxante'] },
        { nome: 'Beatriz Haddad', cpf: '292.929.292-92', rg: '7788993', telefone: '12-92929-2929', email: 'beatriz@email.com', genero: 'Feminino', produtosConsumidos: [], servicosConsumidos: [] },
        { nome: 'Caio Castro', cpf: '303.030.303-03', rg: '1122341', telefone: '12-93030-3030', email: 'caio@email.com', genero: 'Masculino', produtosConsumidos: [], servicosConsumidos: ['Corte de Cabelo'] },
        { nome: 'Débora Secco', cpf: '313.131.313-13', rg: '4455672', telefone: '12-93131-3131', email: 'debora@email.com', genero: 'Feminino', produtosConsumidos: ['Batom Matte Nude'], servicosConsumidos: [] },
        { nome: 'Eliana Michaelichen', cpf: '323.232.323-23', rg: '7788994', telefone: '12-93232-3232', email: 'eliana@email.com', genero: 'Feminino', produtosConsumidos: [], servicosConsumidos: [] }
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
        )
    } else if (tela === 'Cadastros') {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastro tema="purple lighten-4" clientes={clientes} produtos={produtos} servicos={servicos} setClientes={handleSetClientes} setProdutos={handleSetProdutos} setServicos={handleSetServicos} />
            </>
        )
    } else if (tela === 'Clientes') {
        return (
            <>{barraNavegacao}
                <Clientes tema="purple lighten-4" clientes={clientes} setClientes={handleSetClientes} seletorView={selecionarView} />
            </>)
    } else if (tela === 'Produtos') {
        return (
            <>{barraNavegacao}
                <Produtos tema="purple lighten-4" produtos={produtos} setProdutos={handleSetProdutos} seletorView={selecionarView} />
            </>)
    } else if (tela === 'Serviços') {
        return (
            <>{barraNavegacao}
                <Servicos tema="purple lighten-4" servicos={servicos} setServicos={handleSetServicos} seletorView={selecionarView} /></>)
    } else {
        return (
            <>
            {barraNavegacao}
                <ListagensEspeciais tema="purple lighten-4" seletorView={selecionarView} clientes={clientes} produtos={produtos} servicos={servicos}/>
            </>
        )
    }
};
export default Roteador;