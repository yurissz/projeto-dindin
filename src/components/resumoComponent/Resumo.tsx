import React, { useState, useEffect } from "react";
import './resumo.css'
import api from "../../services/api";

export const Resumo: React.FC = () => {
    const [entradas, setEntradas] = useState(0);
    const [saidas, setSaidas] = useState(0);
    const [saldo, setSaldo] = useState(0);

    const handleGetData = async () => {
        try {
           const response = await api.get('transacao/extrato');
           console.log(response);
           const entrada = response.data.entrada
           const saida = response.data.saida 
            
           setEntradas(entrada);
           setSaidas(saida);
           setSaldo(entrada - saida);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <section className='conteinerPrincipal'>
            <p className="layoutResumoTitle">Resumo</p>
            <div className="costumString alingEntradaConteiner">
                <p>Entradas</p>
                <p className="valueEntrada">R$ {entradas.toFixed(2)}</p>
            </div>
            <div className="costumString alingSaidaConteiner">
                <p>Saída</p>
                <p className="valueSaida">R$ {saidas.toFixed(2)}</p>
            </div>
            <section className="border"></section>
            <div className="costumString alingSaldoConteiner">
                <p className="stringSaldo">Saldo</p>
                <p className="valueSaldo">R$ {saldo.toFixed(2)}</p>
            </div>
        </section>
    )
}
