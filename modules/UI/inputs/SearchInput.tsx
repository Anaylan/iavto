import styles from 'assets/sass/components/header/top.module.scss'
import { Search } from 'assets/icon/icons'
interface SearchField {
  placeholder: string
}

export const SearchInput: React.FC<SearchField> = ({ placeholder }) => {
  return (
    <>
      <form
        className={styles['header-top__form']}
        method='GET'
        action='/search'
        acceptCharset='UTF-8'
        id='t-search'
      >
        <div className={styles['header-top__form-wrap']}>
          <input placeholder={placeholder} type='text' name='s' />
          <button className={styles['header-top__form-btn']} type='submit'>
            <span className={styles.icon}>
              <Search color={styles['icon__item']} />
            </span>
          </button>
        </div>
      </form>
    </>
  )
}
