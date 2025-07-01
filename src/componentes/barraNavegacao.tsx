import React from "react";

type Props = {
    tema: string,
    botoes: string[],
   
    seletorView: (novaTela: string, evento: React.MouseEvent<HTMLButtonElement>) => void
}

const BarraNavegacao: React.FC<Props> = ({ tema, botoes, seletorView }) => {
    const gerarListaBotoes = () => {
        if (botoes.length <= 0) return null;
        return botoes.map(valor =>
            <li key={valor}>
                <button
                    className="px-4 py-2 rounded-lg font-semibold hover:bg-black transition"
                    onClick={(e) => seletorView(valor, e)}
                >
                    {valor}
                </button>
            </li>
        );
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="flex flex-wrap justify-between items-center w-full mx-auto">
                <span className="font-extrabold text-lg sm:text-xl mb-2 sm:mb-0">WB</span>
                <ul className="flex flex-wrap gap-2 sm:gap-4 overflow-x-auto">
                    {gerarListaBotoes()}
                </ul>
            </div>
        </nav>
    );
};

export default BarraNavegacao;