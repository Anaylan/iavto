import { ICityItem } from '../regions/Region';

export interface ICarModel {
  id?: number;
  company_name?: string;
  name?: string;
  year?: number;
  price?: number;
  transmission?: string;
  cid?: number | undefined;
  vin?: string;
  pledge?: number;
  description?: string;
  category_name?: string;
  status?: number;
  trans?: any;
  model?: string;
  mark?: string;
  horse?: any;
  created?: any;
  horse_power?: any;
  start_img?: any;
  company_img?: any;
  fuel_type?: string;
  img?: string[];
  city?: ICityItem;
  viewed?: number;
  repair?: number;
  maintenance?: number;
  tires?: number;
  support?: number;
  wanted?: number;
  dtp?: number;
  mileage?: number;
  washing?: number;
  CASCO?: number;
  phone?: number;
  fuel?: number;
}
