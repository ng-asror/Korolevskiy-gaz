export interface IRouletteItemsRes {
  success: boolean;
  data: IItemData;
}

export interface IItemData {
  data: IItem[];
}

export interface IItem {
  id: number;
  accessory_id: number;
  title: string;
  description: string;
  image: string | null;
  probability: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  accessory: IItemAccessory;
}

export interface IItemAccessory {
  id: number;
  uuid: string;
  title: string;
  price: string;
  image: string | null;
  description?: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string | null;
}

export interface ICanSpin {
  success: boolean;
  can_spin: boolean;
  message: string;
  frequency: string;
}

export interface ISpinRes {
  data: {
    spin_id: number;
    prize: {
      id: number;
      title: string;
      description: string | null;
      image_url: string;
      accessory: {
        id: number;
        uuid: string;
        title: string;
        price: string;
        image: string;
        description: any;
        status: string;
        created_at: Date;
        updated_at: Date;
        image_url: string;
      } | null;
    };
    created_at: Date;
  };
}
