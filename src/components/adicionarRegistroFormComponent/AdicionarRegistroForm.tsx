import closeModal from '../../assets/icon/iconCloseModal.svg';
import { useState, useEffect } from 'react';
import style from './adicionarRegistroForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../services/api';
import { Itransaction } from '../../interfaces/transaction';
import { useForm } from 'react-hook-form';
import { IRegistroProp } from "../../interfaces/registros";

interface AdicionarRegistroFormModalProps {
    isOpen?: boolean,
    setIsOpen?: (isOpen: boolean) => void,
    isEdit?: boolean,
    setIsEdit?: boolean,
    registroEdit?: IRegistroProp | null,
    registroCreate: IRegistroProp | null,
    setRegistroCreate: () => void
}

export const AdicionarRegistroFormModal: React.FC<AdicionarRegistroFormModalProps> = ({ isOpen, setIsOpen, isEdit, setIsEdit, registroEdit }) => {

    const [selectedValue, setSelectedValue] = useState<null | string>('');

    const schema = yup.object({
        tipo: yup.string().required('Deve ser selecionado um tipo para o registro'),
        descricao: yup.string().required('A descrição é obrigatorio.'),
        valor: yup.number().required('O valor da transição é obrigatoria.'),
        data: yup.string().required('O valor da data deve ser selecionado'),
        categoria_id: yup.number().required('Pelo menos uma das categorias deve ser selecionada')
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });


    useEffect(() => {
        if (isEdit && registroEdit?.registro) {
            console.log("Preenchendo os valores do formulário:", registroEdit.registro);
            setValue('tipo', registroEdit.registro.tipo);
            setValue('descricao', registroEdit.registro.descricao);
            setValue('valor', registroEdit.registro.valor);
            setValue('data', registroEdit.registro.data);
            setValue('categoria_id', registroEdit.registro.categoria_id);
            setSelectedValue(registroEdit.registro.tipo || 'entrada');
        }
    }, [registroEdit, isEdit, setValue]);

    const handleSubmitTransation = async (InputValue: Itransaction) => {
        try {

            let response;
            if (isEdit && registroEdit?.registro) {
                console.log("Dados antes de enviar:", registroEdit.registro);
                response = await api.put(`/transacao/${registroEdit.registro.id}`, {
                    tipo: InputValue.tipo,
                    descricao: InputValue.descricao,
                    valor: InputValue.valor,
                    data: InputValue.data,
                    categoria_id: InputValue.categoria_id
                });
            } else {
                response = await api.post('/transacao', {
                    tipo: InputValue.tipo,
                    descricao: InputValue.descricao,
                    valor: InputValue.valor,
                    data: InputValue.data,
                    categoria_id: InputValue.categoria_id
                });
            }
            console.log(`dados: ${JSON.stringify(response.data)}`);
            handleCloseModal();
        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro ao cadastrar a sua transação. Tente novamente mais tarde.');
        }
    }
    const entranceActive = () => {
        setSelectedValue('entrada');
        setValue('tipo', 'entrada');
    };

    const cashOutflows = () => {
        setSelectedValue('saida');
        setValue('tipo', 'saida');
    };

    useEffect(() => {
        if (selectedValue !== null) {
            console.log('Valor selecionado:', selectedValue);
        }
    }, [selectedValue]);


    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleCloseEdit = () => {
        setIsEdit(false);
    }

    if (isOpen) {
        return (
            <div className={style.modalOverlay}>
                <section className={style.alingItensRow}>
                    <div className={style.alingTitle}>
                        <h1>{isEdit ? 'Editar Registro' : 'Adicionar Registro'}</h1>
                        <img src={closeModal} alt="closeModalImg" onClick={handleCloseModal} className={style.closeIcon} />
                    </div>
                    <form className={style.forms} action="" onSubmit={handleSubmit(handleSubmitTransation)}>
                        <div className={style.alignButtons}>
                            <button className={`${style.button} ${selectedValue === 'entrada' ? style.activeButtonEntrada : ''}`} onClick={entranceActive} type='button'>Entrada</button>
                            <button className={`${style.button} ${selectedValue === 'saida' ? style.activeButtonSaida : ''}`} onClick={cashOutflows} type='button'>Saida</button>
                            <input type="hidden" {...register('tipo')} />
                            <p>{errors.tipo?.message}</p>
                        </div>
                        <label htmlFor="valor">Valor</label>
                        <input type="text" id="valor" {...register('valor')} />
                        <p>{errors.valor?.message}</p>
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" {...register('categoria_id')}>
                            <option value="">Selecione uma Opção</option>
                            <option value="1" >Alimentação</option>
                            <option value="2" >Assinaturas e Serviços</option>
                            <option value="3" >Casa</option>
                            <option value="4" >Compras</option>
                            <option value="5" >Cuidados pessoais</option>
                            <option value="6" >Educação</option>
                        </select>
                        <p>{errors.categoria_id?.message}</p>
                        <label htmlFor="date">Data</label>
                        <input type="date" {...register('data')} />
                        <p>{errors.data?.message}</p>
                        <label htmlFor="">Descrição</label>
                        <input type="text" {...register('descricao')} />
                        <p>{errors.descricao?.message}</p>
                        <button className={style.customButton} type='submit'>Confirmar</button>
                    </form>
                </section>
            </div>
        )
    } else {
        return null
    }


}