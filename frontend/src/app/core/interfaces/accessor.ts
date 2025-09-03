export interface IAccessor {
  success: boolean;
  data: {
    current_page: number;
    data: {
      id: number;
      title: string;
      price: string;
      uuid: string;
      image: any;
      description: string;
      status: string;
      created_at: string;
      updated_at: string;
      image_url: any;
    }[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url?: string;
      label: string;
      active: boolean;
    }[];
    next_page_url: any;
    path: string;
    per_page: number;
    prev_page_url: any;
    to: number;
    total: number;
  };
}
