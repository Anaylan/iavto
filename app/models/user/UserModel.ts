export interface UserDataModel {
  [x: string]: any
  id: number
  email: string
  grade: number
  lastname?: string | undefined
  firstname: string
  secondname?: string | undefined
  u_status: string
  telephone?: string | undefined
  created: Date
  balance: number
  partners_balance: number
  modified: Date
  description?: string | undefined
  status?: number | undefined
  avatar?: string | undefined
}

export interface UserModel {
  data?: UserDataModel | null
  status: number
}

export interface UserLocation {
  id: number
  name: string
  region_name: string
}
