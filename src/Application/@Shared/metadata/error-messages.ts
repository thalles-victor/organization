import { ThrowErrorMessageType } from '../types/error-messages';

export const ThrowErrorMessage: ThrowErrorMessageType = {
  signUp_alreadyExist: {
    engUS: 'email in used',
    ptBR: 'email en uso',
  },

  signIn_userNotExist: {
    ptBR: 'user not exist',
    engUS: 'usuário não existe',
  },

  userBanned: {
    engUS: 'user banned or deleted',
    ptBR: 'usuário banido ou deletado',
  },

  signIn_passwordInvalid: {
    engUS: 'password invalid',
    ptBR: 'senha inválida',
  },
};
