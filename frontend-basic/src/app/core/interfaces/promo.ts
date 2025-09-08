export interface IPromoRes {
  success: boolean;
  message: string;
  data: IPromocode;
}

export interface IPromocode {
  id: number;
  promocode: string;
  amount: number;
  type: string;
}
