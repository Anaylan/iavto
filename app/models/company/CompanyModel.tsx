export interface ICarparkModel {
  orders_count?: number | null;
  rating_count?: number | null;
  cid: number | null;
  company_name: string | null;
  description: string | null;
  geo_city: number | null;
  status: number | null;
  img: string | null;
  banner: string | null;
  rait: number | null;
  tarif: number | null;
  place: number | null;
  count_product: number | null;
  favorite: boolean;
  created: string;
}

export interface ICarparkBlock {
  getData: CallableFunction;
  columns: any;
  title: string;
  large: boolean;
}
