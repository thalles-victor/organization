type ThrowErrorMessageKeys = 'signUp_alreadyExist' | 'signIn_userNotExist';

export type ThrowErrorMessageType = {
  [K in ThrowErrorMessageKeys]: { engUS: string; ptBR: string };
};
