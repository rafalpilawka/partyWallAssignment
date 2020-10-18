export type TItem = {
  name: string;
  price: number;
  variant: TVariant;
  createdBy: string;
  type: string;
  id?: string;
};

export interface IFood extends TItem {
  description: string;
  weight: number;
}
export interface IDrink extends TItem {
  volume: number;
}

export type TVariant = 'food' | 'drink';
