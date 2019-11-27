import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LeftContainer, RightContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { spring } from '../../utils/animations';

const schema = Yup.object().shape({
  signName: Yup.string().required('Preencha com seu nome completo'),
  signUsername: Yup.string().required('Preencha um nome de usuário'),
  signEmail: Yup.string()
    .email('Email inválido')
    .required('Preencha seu email'),
  signPassword: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .required('Preencha uma senha'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('signPassword'), null], 'Senhas devem ser iguais')
    .required('Confirmação de senha é obrigatória'),
});

export default function SignUp({ history }) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [loginPasswordIsVisible, setLoginPasswordIsVisible] = useState(false);
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userData, setUserData] = useState({});

  function handleTogglePassword() {
    setPasswordIsVisible(!passwordIsVisible);
  }

  function handleToggleConfirmPassword() {
    setConfirmIsVisible(!confirmIsVisible);
  }

  function handleToggleLoginPassword() {
    setLoginPasswordIsVisible(!loginPasswordIsVisible);
  }

  function handleSubmit(data) {
    setIsFormModalOpen(true);
    setUserData(data);
  }

  const leftTransition = {
    hidden: { x: -500 },
    visible: {
      x: 0,
      transition: {
        ...spring,
        stiffness: 80,
      },
    },
  };

  const rightTransition = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...spring,
        stiffness: 40,
        delay: 0.35,
        staggerChildren: 0.075,
        delayChildren: 0.5,
      },
    },
  };

  const childTransition = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <LeftContainer
        initial="hidden"
        animate="visible"
        variants={leftTransition}
      >
        <header>
          <Button
            secondary
            onClick={() => history.goBack()}
            icon="FaArrowAltCircleLeft"
            iconSize={24}
          />
        </header>
        <motion.h1
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, stiffness: 80, delay: 0.2 }}
        >
          <img
            src="https://rocketseat.com.br/static/images/experience/RSXP.svg"
            alt="Rocketseat"
          />
        </motion.h1>

        <small>
          Made by{' '}
          <a
            href="https://github.com/lukemorales"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luke Morales
          </a>
        </small>
      </LeftContainer>

      <RightContainer>
        <header>
          Já é um membro?{' '}
          <Button inline onClick={() => setIsLoginModalOpen(true)}>
            Entrar
          </Button>
        </header>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={rightTransition}
        >
          <h3>Inscreva-se na Rocketseat</h3>
          <section>
            <Button icon="FaGoogle" onClick={() => {}}>
              Entrar com Google
            </Button>
            <Button color="#373546" icon="FaTwitter" onClick={() => {}} />
            <Button
              color="#373546"
              icon="FaFacebookSquare"
              onClick={() => {}}
            />
          </section>

          <div>
            <hr />
            <span>Ou</span>
          </div>

          <Form schema={schema} onSubmit={handleSubmit}>
            <div>
              <Input
                label="Nome Completo"
                name="signName"
                variants={childTransition}
              />
              <Input
                label="Username"
                name="signUsername"
                variants={childTransition}
              />
            </div>
            <Input
              icon="MdEmail"
              label="Email"
              name="signEmail"
              variants={childTransition}
            />
            <Input
              icon="MdLock"
              label="Senha"
              name="signPassword"
              type={passwordIsVisible ? 'text' : 'password'}
              variants={childTransition}
            >
              <button
                className="btn__transparent"
                type="button"
                onClick={handleTogglePassword}
                tabIndex="-1"
              >
                {passwordIsVisible ? (
                  <MdVisibilityOff size={18} fill="#5E5C66" />
                ) : (
                  <MdVisibility size={18} fill="#fff" />
                )}
              </button>
            </Input>
            <Input
              icon="MdLock"
              label="Confirmar Senha"
              name="confirmPassword"
              type={confirmIsVisible ? 'text' : 'password'}
              variants={childTransition}
            >
              <button
                className="btn__transparent"
                type="button"
                onClick={handleToggleConfirmPassword}
                tabIndex="-1"
              >
                {confirmIsVisible ? (
                  <MdVisibilityOff size={18} fill="#5E5C66" />
                ) : (
                  <MdVisibility size={18} fill="#fff" />
                )}
              </button>
            </Input>
            <Button color="#04D361" large type="submit">
              Criar conta
            </Button>
          </Form>
        </motion.section>
      </RightContainer>

      <Modal
        open={isFormModalOpen}
        icon={<FaCheckCircle size={48} color="#04D361" />}
        title={`Bem-vindo a Rocketseat,\n${userData.signName}`}
        success
        closeAction={() => setIsFormModalOpen(false)}
      >
        <p>
          Seu usuário de acesso é: <em>{userData.signUsername}</em> e agora só
          falta confirmar seu email (
          <a href={`mailto:${userData.signEmail}`}>{userData.signEmail}</a>).
        </p>
        <footer>
          <p>
            Confira sua caixa de entrada pelo email que enviamos contendo o link
            de confirmação.
          </p>
        </footer>
      </Modal>

      <Modal
        open={isLoginModalOpen}
        icon={
          <img
            src="https://rocketseat.com.br/static/images/logo-rocketseat.svg"
            alt="Rocketseat"
          />
        }
        title="Entrar com Sua Conta"
        footerButtons
        closeAction={() => setIsLoginModalOpen(false)}
      >
        <Form onSubmit={() => {}}>
          <Input icon="MdEmail" name="email" />
          <Input
            icon="MdLock"
            label="Senha"
            name="password"
            type={loginPasswordIsVisible ? 'text' : 'password'}
          >
            <button
              className="btn__transparent"
              type="button"
              onClick={handleToggleLoginPassword}
              tabIndex="-1"
            >
              {loginPasswordIsVisible ? (
                <MdVisibilityOff size={18} fill="#5E5C66" />
              ) : (
                <MdVisibility size={18} fill="#fff" />
              )}
            </button>
          </Input>
        </Form>
        <footer>
          <Button secondary onClick={() => setIsLoginModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setIsLoginModalOpen(false)}>Entrar</Button>
        </footer>
      </Modal>
    </>
  );
}

SignUp.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
