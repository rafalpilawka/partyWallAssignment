export type TCredentials = {
  email: string;
  password: string;
};

export type TUserData = any;
//EXPAND USER REGISTRATION TYPE FOR OTHER
export interface IUserRegisterData extends TCredentials {
  name: string;
  surname: string;
}
