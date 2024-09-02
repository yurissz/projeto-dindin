import React from "react";
import styles from './login.module.css';
import logo from '../../assets/didinLogo.svg';
import Button from "../../components/buttonComponent/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from '../../services/api';
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { IsignIn } from "../../interfaces/signIn";

const schema = object({
  email: string().required('O email é obrigatório'),
  senha: string().required('A senha é obrigatória').min(8, 'A senha no mínimo deve possuir 8 caracteres')
});

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegisterClick = () => {
    navigate("/register")
  }

  const handleFormSignIn = async (inputValue: IsignIn) => {
    try {
      const { data } = await api.post('/login', {
        email: inputValue.email,
        senha: inputValue.senha,
      });
      console.log(data);

      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        console.log(data);
        navigate('/home');
      }
    } catch (error) {
      alert('Ocorreu um erro');
    }
  };

  const buttonLogin = {
    width: '100%',
    marginBottom: '1rem',
  };

  return (
    <section className={styles.bgLogin}>
      <div className={styles.layout}>
        <div className={styles.imgWrapper}>
          <img src={logo} alt="dindinLogo" className={styles.img} />
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.textContainer}>
            <h1>Controle suas <span>finanças</span>,<br />sem planilha chata.</h1>
            <p>Organizar as suas finanças nunca foi tão fácil,<br /> com o DINDIN, você tem tudo num único lugar<br /> e em um clique de distância.</p>
            <Button onClick={handleRegisterClick} >
              Cadastre-se
            </Button>
          </div>
          <div className={styles.containerLogin}>
            <div className={styles.title}>
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit(handleFormSignIn)} className={styles.forms}>
              <label htmlFor="email">Email</label>
              <input {...register('email')} type="email" />
              <p>{errors.email?.message}</p>
              <label htmlFor="senha">Senha</label>
              <input {...register('senha')} type="password" />
              <p>{errors.senha?.message}</p>
              <Button style={buttonLogin}>
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
