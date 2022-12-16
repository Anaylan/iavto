export interface IAdModel {
  id: number;
  place?: IPlaces;
  img: string;
  link: string;
}

export enum IPlaces {
  'post',
  'car_info',
  'feedback',
  'index',
}
