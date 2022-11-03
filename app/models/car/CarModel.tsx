import { ICityItem } from '../regions/Region'

export interface ICarModel {
  id?: number
  company_name?: string
  name?: string
  year?: number
  price?: number
  transmission?: string
  cid?: number
  vin?: string
  pledge?: number
  description?: string | undefined
  category_name?: string
  status?: number
  trans?: any
  model?: string
  mark?: string
  horse?: any
  created?: any
  horse_power?: any
  start_img?: any
  company_img?: any
  fuel_type?: string
  img?: string[]
  city?: ICityItem
}
