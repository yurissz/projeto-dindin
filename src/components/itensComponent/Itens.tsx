import React, { useEffect, useState } from "react";
import './itens.css';
import trash from '../../assets/icon/iconTrashCan.svg';
import pen from '../../assets/icon/iconPen.svg';
import { IRegistroProp } from "../../interfaces/registros";
import { format, set } from "date-fns";
import api from "../../services/api";
import { IRegistro } from "../../interfaces/registros";
import { AdicionarRegistroFormModal } from "../adicionarRegistroFormComponent/AdicionarRegistroForm";

export const Itens: React.FC<IRegistroProp> = ({ registro }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registroEdit, setRegistroEdit] = useState<IRegistroProp | null>(null);

    const handleEditTransaction = (registro: IRegistro) => {
        console.log("Registro para edição:", registro);
        setRegistroEdit({ registro });
        setIsModalOpen(true);
    };

    const handleDeletTransaction = async (registroId: number) => {
        try {
            const response = await api.delete(`transacao/${registroId}`);
            if (response.status === 200) {
                alert('Registro deletado com sucesso.');
            }
        } catch (error) {
            alert('Ocorreu um erro ao tentar deletar o registro selecionado, tente novamente mais tarde.');
        }
    };

    const arraydaysOfTheWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    const customDate: string | Date = new Date();
    const confirmDate = customDate.setDate(customDate.getDate() + 1)
    const dataPersonificada = format(new Date(confirmDate), "dd/MM/yy");
    const dayOfTheWeek = arraydaysOfTheWeek[customDate.getDay()];


    return (
        <div className="positionBorder">
            <section className="alingBothConteiners">
                <div className="costumConteiner alingConteiner">
                    <p>{dataPersonificada}</p>
                    <p>{dayOfTheWeek}</p>
                    <p>{registro.categoria_nome}</p>
                    <p>{registro.descricao}</p>
                    <p>R$ {registro.valor}</p>
                </div>
                <div className="alingIcons">
                    <img src={pen} alt="penIcon" className="clickableItem" onClick={() => handleEditTransaction(registro)} />
                    <AdicionarRegistroFormModal isEdit={!!registroEdit} setIsEdit={setIsModalOpen} isOpen={isModalOpen} setIsOpen={setIsModalOpen} registroEdit={registroEdit} />
                    <img src={trash} alt="trashIcon" className="clickableItem" onClick={() => handleDeletTransaction(registro.id)} />
                </div>
            </section>
            <div className="borderEntreItens"></div>
        </div>
    );
};
