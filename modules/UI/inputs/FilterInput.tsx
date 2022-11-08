import styles from 'assets/sass/components/blocks/search.module.scss'
import { Search } from 'assets/icon/icons'
import { InputHTMLAttributes } from 'react'

interface SearchField extends InputHTMLAttributes<HTMLInputElement> {
  props?: InputHTMLAttributes<HTMLInputElement>
}

export const FilterInput: React.FC<SearchField> = (props) => {
  return (
    <>
      <input className={`${styles['search-form__input']}`} {...props} />
    </>
  )
}
