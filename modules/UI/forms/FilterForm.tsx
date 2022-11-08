import { IForm } from 'app/models'
import { FC } from 'react'
import styles from './FilterForm.module.scss'

export const FilterForm: FC<IForm> = ({ children, ...props }) => {
  return (
    <form className={styles['search-from']} {...props}>
      {children}
    </form>
  )
}
