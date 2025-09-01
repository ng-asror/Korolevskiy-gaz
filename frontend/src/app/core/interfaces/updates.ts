export interface IUpdates {
  success: boolean;
  data: {
    enable_promocode: number;
    require_phone_on_order: number;
    site_title: string;
    site_logo: string;
    cargo_price: number;
  };
}
