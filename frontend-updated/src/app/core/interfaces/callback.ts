export interface ICallbackRes {
  message: string;
  data: {
    user_id: number;
    phone: string;
    status: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}
