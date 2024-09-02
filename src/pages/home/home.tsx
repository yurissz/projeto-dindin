import { Header } from "../../components/headerComponent/Header";
import style from './home.module.css'
import { Categories } from "../../components/categoriesComponent/Categories";
import { Itens } from "../../components/itensComponent/Itens";
import { Resumo } from "../../components/resumoComponent/Resumo";
import Button from "../../components/buttonComponent/Button"
import { useLoaderData, useNavigate } from "react-router-dom";
import { IRegistro } from "../../interfaces/registros";
import { IUser } from "../../interfaces/user";
import { AdicionarRegistroFormModal } from "../../components/adicionarRegistroFormComponent/AdicionarRegistroForm";
import { useEffect, useState } from "react";


export const Home: React.FC = () => {
    const user: IUser = JSON.parse(localStorage.getItem('user'))

    const itens = useLoaderData() as IRegistro[]
    console.log(itens);

    const filterItens = itens.filter(item => item.usuario_id == user.id)
    console.log(filterItens);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [handleCloseModal])

    return (
        <>
            <Header>
                <section className={style.alingBody}>
                    <div className={style.alingConteiners}>
                        <Categories />
                        {filterItens.length == 0 ? <h1 className={style.negativeMessageNoItem}>Não há registros...</h1>
                            : filterItens.map((item: IRegistro) => <Itens registro={item} key={item.id} />)}
                    </div>
                    <div className={style.alingResumoAndButtom}>
                        <Resumo></Resumo>
                        <Button onClick={handleOpenModal}>Alterar Registro</Button>
                        <AdicionarRegistroFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
                    </div>
                </section>
            </Header >
        </>
    )
}