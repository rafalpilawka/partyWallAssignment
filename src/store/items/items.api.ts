import {firestore} from 'src/utils/services/api/firebase';
import {IDrink, IFood, TVariant} from 'src/store/items/items.types';

export const getCollectionApi = async (
  variant: string,
): Promise<Array<IFood | IDrink>> => {
  const snapshot = await firestore.collection(`${variant}`).get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  }) as Array<IFood | IDrink>;
};

export const createItemApi = async ({
  variant,
  ...rest
}: IFood | IDrink): Promise<any> =>
  await firestore.collection(`${variant}`).add(rest);

export const updateItemApi = async ({
  variant,
  id,
  ...rest
}: IFood | IDrink): Promise<any> =>
  await firestore.doc(`${variant}/${id}`).update(rest);

export const removeItemApi = async ({
  variant,
  id,
}: {
  id: string;
  variant: TVariant;
}): Promise<any> => await firestore.doc(`${variant}/${id}`).delete();
