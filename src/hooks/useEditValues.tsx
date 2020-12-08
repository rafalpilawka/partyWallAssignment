import React, {useState} from 'react';

export type TInputNames = {
  price: string;
  description: string;
  volume: string;
  weight: string;
  errors: string;
  name: string;
};

export enum InputNames {
  name,
  description,
  price,
  volume,
  weight,
}

export const initialEditValues = {
  price: '',
  description: '',
  volume: '',
  weight: '',
  errors: '',
  name: '',
};

export const useEditValues = () => {
  const [values, setValues] = useState<TInputNames>(initialEditValues);
  const clearValues = () => setValues(initialEditValues);

  return {values, setValues, clearValues};
};
