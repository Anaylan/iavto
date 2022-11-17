export interface IReviewModel {
  id?: number;
  cid?: number;
  uid?: number;
  mark?: string;
  model?: string;
  year?: number;
  company_name: string;
  price?: number;
  date_created?: string;
  raiting?: number;
  img?: string[];
  comment?: string;
  pid: number;
  rating: number;
  user_firstname?: string;
  user_lastname?: string;
  user_avatar?: string;
}
