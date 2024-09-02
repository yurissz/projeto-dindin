import React from 'react';
import logo from '../../assets/didinLogo.svg';
import styles from './register.module.css';
import Button from '../../components/buttonComponent/Button';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IsignUp } from '../../interfaces/signUp';
import api from '../../services/api';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  senha: yup.string().required('A senha é obrigatória').min(8, 'A senha precisa ter pelo menos 8 caracteres'),
  confirmSenha: yup.string().oneOf([yup.ref('senha')], 'As senhas devem coincidir').required('Confirmação de senha obrigatória')
}).required();

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const buttonRegister: React.CSSProperties = {
    width: '100%',
    marginBottom: '1rem',
  };

  const handleFormSignUp = async (inputValues: IsignUp) => {
    try {
      const response = await api.post('/usuario', {
        nome: inputValues.nome,
        email: inputValues.email,
        senha: inputValues.senha,
      });

      console.log('dados da resposta:', response.data, response.status);
      
      switch (response.status) {
        case 201:
          alert('Usuário cadastrado com sucesso');
          navigate('/');
          break;
      }
    } catch (error:any) {
      if (error.response){
        switch (error.response.status) {
          case 400:
            alert('Erro na requisição. Já existe uma conta com o email cadastrado');
            break;
          case 401:
            alert('Não autorizado. Verifique suas credenciais.');
            break;
          case 500:
            alert('Erro no servidor. Tente novamente mais tarde.');
            break;
          default:
            alert('Ocorreu um erro inesperado. Tente novamente.');
            console.log(error.response);
            break;
        }
      } else {
        alert('Ocorreu um erro.')
      }
    }
  };

  return (
    <section className={styles.bgRegister}>
      <div className={styles.layout}>
        <div className={styles.imgWrapper}>
          <img src={logo} alt="dindinLogo" className={styles.img} />
        </div>
        <section className={styles.containerWrap}>
          <div className={styles.containerRegister}>
            <h2>Cadastre-se</h2>
            <form onSubmit={handleSubmit(handleFormSignUp)} className={styles.forms}>
              <label htmlFor="nome">Nome</label>
              <input {...register('nome')} type="text" />
              <p className={styles.errorInputText}> {errors.nome?.message}</p>
              <label htmlFor="email">Email</label>
              <input {...register('email')} type="email" />
              <p className={styles.errorInputText}>{errors.email?.message}</p>
              <label htmlFor="senha">Senha</label>
              <input {...register('senha')} type="password" />
              <p className={styles.errorInputText}>{errors.senha?.message}</p>
              <label htmlFor="confirmSenha">Confirmação de senha</label>
              <input {...register('confirmSenha')} type="password" />
              <p className={styles.errorInputText}>{errors.confirmSenha?.message}</p>
              <Button style={buttonRegister}>Cadastrar</Button>
            </form>
            <a className={styles.alertText} onClick={() => navigate('/')}>Já tem cadastro? Clique aqui!</a>
          </div>
        </section>
      </div>
    </section>
  );
};
