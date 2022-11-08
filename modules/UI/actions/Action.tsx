import { Heart } from 'assets/icon/icons'
import styles from './Action.module.scss'

export const ActionFollow = () => {
  return (
    <>
      <div className={styles['carpark-intro__action']}>
        <button className={styles['carpark-intro__action-btn']} type='button'>
          <div className={styles['icon']}>
            <Heart color={styles['icon__item']} />
          </div>
        </button>
      </div>
    </>
  )
}
