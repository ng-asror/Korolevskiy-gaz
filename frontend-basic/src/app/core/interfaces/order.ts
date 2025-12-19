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
  order_number: number;
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
export interface IOrderFinishRes {
  success: boolean;
  message: string;
  data: {
    id: number;
    order_number: number;
    user_id: number;
    promocode_id: number | null;
    payment_type: string;
    promo_price: number;
    cargo_price: number;
    all_price: number;
    total_price: number;
    price_type: string | null;
    address: string;
    phone: string;
    comment: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    status_text: string;

    azots:
      | {
          id: number;
          order_id: number;
          azot_id: number;
          count: number;
          price: string;
          total_price: string;
          created_at: string;
          updated_at: string;
          price_type_id: number;
          price_type_name: string;
          azot: {
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
            price_types: {
              id: number;
              uuid: string;
              azot_id: number;
              name: string;
              price: string;
              created_at: string;
              updated_at: string;
            }[];
          };
        }[]
      | null;

    accessories:
      | {
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
        }[]
      | null;

    services: any[];
    promocode: any;
    user: {
      id: number;
      uuid: string;
      tg_id: string;
      username: string | null;
      phone: string | null;
      address: string | null;
      role: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    roulette_spin: any;
  };
}
