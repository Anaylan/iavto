export interface UserDataModel {
  [x: string]: any;
  id: number;
  email: string;
  grade: number;
  lastname?: string | undefined;
  firstname: string;
  secondname?: string | undefined;
  u_status: string;
  telephone?: string | undefined;
  created: Date;
  balance: string;
  partners_balance: string;
  modified: Date;
  description?: string | undefined;
  status?: number | undefined;
  avatar?: string | undefined;
}

export interface UserModel {
  data: UserDataModel | null;
  status: number;
  token?: string | undefined;
  message?: string;
}

export interface UserLocation {
  id: number;
  name: string;
  region_name: string;
}
