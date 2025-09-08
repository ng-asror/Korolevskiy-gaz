export interface IBasket {
  success: boolean;
  data: IBasketData;
}

export interface IBasketData {
  azots: IBasketAzot[];
  accessories: IBasketAccessory[];
  services: IBasketService[];
  total_price: number;
}

export interface IBasketAzot {
  product_id: number;
  name: string;
  price_type: string;
  price: string;
  price_type_id: number;
  quantity: number;
  product: {
    id: number;
    uuid: string;
    title: string;
    type: string;
    image: string;
    description: string;
    country: string;
    status: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
  price_types: {
    id: number;
    uuid: string;
    azot_id: number;
    name: string;
    price: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface IBasketAccessory {
  product_id: number;
  name: null | string;
  price: string;
  quantity: number;
  product: {
    id: number;
    uuid: string;
    title: string;
    price: string;
    image: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
}

export interface IBasketService {
  product_id: number;
  name: string | null;
  price: string;
  quantity: number;
  product: IProduct;
}

export interface IProduct {
  quantity: number;
  id: number;
  uuid: string;
  title: string;
  type?: string;
  price?: string;
  image: string;
  description: string;
  country?: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface ILocalBasket {
  azots: IBasketAzot[];
  accessories: IBasketAccessory[];
  total_count: number;
  total_price: number;
}

export interface IDecoration {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    promocode_id: number;
    payment_type: any;
    status: string;
    promo_price: number;
    all_price: number;
    total_price: number;
    updated_at: string;
    created_at: string;
    id: number;
    uuid: string;
    status_text: string;
    azots: IBasketAzot[];
    accessories: IBasketAzot[];
    services: any[];
    promocode: IBasketPromocode;
    user: IUser;
  };
}

export interface IBasketPromocode {
  id: number;
  uuid: string;
  promocode: string;
  amount: string;
  status: string;
  type: string;
  start_date: any;
  end_date: any;
  countable: number;
  used_count: number;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: number;
  tg_id: string;
  username: any;
  phone: any;
  address: any;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}
