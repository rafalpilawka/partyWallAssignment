import * as yup from 'yup';

export const InputValidators = {
  register: yup.object().shape({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup
      .string()
      .email('Bad format of email')
      .required('Emailis required'),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
  }),
};
