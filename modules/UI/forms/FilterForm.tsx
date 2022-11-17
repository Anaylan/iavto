import { IForm } from 'app/models'
import { FC } from 'react'

export const FilterForm: FC<IForm> = ({ children, ...props }) => {
  return (
    <form className={'search-from'} {...props}>
      {children}
    </form>
  )
}
