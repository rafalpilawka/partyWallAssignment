import {ObjectSchema, Shape} from 'yup';
import * as yup from 'yup';

//TODO ADD LOCALIZATION WITH i18NEXT
export const InputValidators: TInputValidators = {
  registerScheme: yup.object().shape({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup
      .string()
      .email('Bad format of email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
  }),
  addFoodItemScheme: yup.object().shape({
    name: yup.string().required('Item name is required'),
    price: yup.number().required('Place a price'),
    type: yup.string().required('Specify type'),
  }),
  addDrinkItemScheme: yup.object().shape({
    name: yup.string().required('Item name is required'),
    price: yup.number().required('Place a price'),
    type: yup.string().required('Specify type'),
  }),
};

export type TInputValidators = {
  registerScheme: ObjectSchema<Shape<any, any>>;
  addFoodItemScheme: ObjectSchema<Shape<any, any>>;
  addDrinkItemScheme: ObjectSchema<Shape<any, any>>;
};
