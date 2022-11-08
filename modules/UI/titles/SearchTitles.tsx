import { ReactNode } from 'react'
import styles from 'assets/sass/components/blocks/search.module.scss'

export const SearchTitleH3 = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h3 className={`${styles['search__title-sm']} title-sm`}>{children}</h3>
    </>
  )
}
