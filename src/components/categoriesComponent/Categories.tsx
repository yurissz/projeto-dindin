import React from "react";
import './categories.css'

export const Categories: React.FC = () => {
    return (
        <div className='layoutConteiner positioningConteiner'>
            <p>Data</p>
            <p>Dia da semana</p>
            <p>Descrição</p>
            <p>Categoria</p>
            <p>Valor</p>
        </div>
    )
}