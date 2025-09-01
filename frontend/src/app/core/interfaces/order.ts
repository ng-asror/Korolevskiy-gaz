// export interface IOrderCreate {
//   tg_id: string;
//   promocode: string;
//   phone: string;
//   address: string;
//   comment: string;
//   cargo_with: boolean;
// }

export interface IOrderCreate {
  tg_id: string;
  promocode: string;
}
export interface IOrderCreateRes {
  success: boolean;
  data: IOrderResData;
}
export interface IMyOrdersRes {
  success: boolean;
  data: IOrderResData[];
}
export interface IOrderResData {
  id: number;
  user_id: number;
  promocode_id: number | null;
  payment_type: string | null;
  promo_price: number;
  cargo_price: string | null;
  all_price: number;
  total_price: number;
  price_type: string | null;
  address: string | null;
  phone: string | null;
  comment: string | null;
  status: 'new' | 'pending' | 'accepted' | 'rejected' | 'completed' | 'deleted';
  created_at: string;
  updated_at: string;
  status_text: string;
  azots: IOrderAzot[];
  accessories: IOrderAccessor[];
  services: any[];
  promocode: {
    id: number;
    promocode: string;
    amount: string;
    status: string;
    type: string;
    start_date: string | null;
    end_date: string | null;
    countable: number | null;
    used_count: number | null;
    created_at: string;
    updated_at: string;
  } | null;
  user: {
    id: number;
    tg_id: string | null;
    username: string | null;
    phone: string | null;
    address: string | null;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IOrderAzot {
  id: number;
  order_id: number;
  azot_id: number;
  count: number;
  price: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  azot: {
    id: number;
    title: string;
    type: string;
    image: string;
    description: string | null;
    country: string | null;
    status: string;
    price_type_name: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
}

export interface IOrderAccessor {
  id: number;
  order_id: number;
  accessory_id: number;
  count: number;
  price: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  accessory: {
    id: number;
    title: string;
    price: string;
    image: string;
    description: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    image_url: string;
  };
}

export interface IOrderFinishReq {
  phone: string;
  address: string;
  comment: string;
  cargo_with: boolean;
  payment_type: string;
  service_ids: number[];
}
