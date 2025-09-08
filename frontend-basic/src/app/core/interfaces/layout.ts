export interface ILayout {
  success: boolean;
  data: ILayoutData;
}

export interface ILayoutData {
  enable_promocode: boolean;
  require_phone_on_order: boolean;
  site_title: string;
  site_logo: string;
  cargo_price: number;
}
