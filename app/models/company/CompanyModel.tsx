export interface ICarparkModel {
  cid: number
  company_name: string
  description: string
  geo_city: number
  status: number
  img: string
  banner: string
  rait: number
  tarif: number
  place: number
  count_product: number
}

export interface ICarparkBlock {
  getData: CallableFunction
  columns: any
  title: string
  large: boolean
}
