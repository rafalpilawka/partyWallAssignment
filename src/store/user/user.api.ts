import {TCredentials} from 'src/store/user/user.types';
import {firestore, auth, detachedAuth} from 'src/utils/services/api/firebase';

export const getUserdataApi = async (userUid: string) =>
  await firestore.doc(`users/${userUid}`).get();

export const loginUserApi = async (credentials: TCredentials): Promise<any> =>
  await auth.signInWithEmailAndPassword(
    credentials.email,
    credentials.password,
  );

export const registerUserApi = async (
  credentials: TCredentials,
): Promise<any> =>
  await detachedAuth.createUserWithEmailAndPassword(
    credentials.email,
    credentials.password,
  );

export const logoutUserApi = (): Promise<any> => auth.signOut();

export const createProfileApi = async (
  id: string,
  name: string,
  surname: string,
): Promise<any> =>
  await firestore.doc(`users/${id}`).set({name, surname, date: Date.now()});
