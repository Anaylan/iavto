export interface IRegionDropdown {
  active: boolean
  setLocations: CallableFunction
  locations: IRegionItem[]
  onClick: CallableFunction
}

export interface IRegionItem {
  id: number
  name: string | undefined
  region_name: string
}

export interface ICityItem {
  name: string
}
