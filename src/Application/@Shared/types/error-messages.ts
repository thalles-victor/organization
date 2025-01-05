type ThrowErrorMessageKeys =
  | 'signUp_alreadyExist'
  | 'signIn_userNotExist'
  | 'signIn_passwordInvalid'
  | 'userBanned';

export type ThrowErrorMessageType = {
  [K in ThrowErrorMessageKeys]: { engUS: string; ptBR: string };
};
