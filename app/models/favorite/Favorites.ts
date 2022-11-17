import { ICarModel } from '../car/CarModel';
import { ICarparkModel } from '../company/CompanyModel';

export interface IFavoritesModel {
  car: ICarModel[];
  company: ICarparkModel[];
}
