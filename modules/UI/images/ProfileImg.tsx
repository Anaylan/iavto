import styles from 'assets/sass/components/profile/infoprofile.module.scss'
import prof from 'assets/sass/components/profile/profile.module.scss'
import Image from 'next/image'

export const ProfileImg = ({avatar}) => {
  return (
    <>
      <div className={styles['info-profile__img-add']}>
        <input type='hidden' id='profileImgAdd' />
        <label htmlFor='profileImgAdd'>
          <div className={styles['info-profile__img-wrap']}>
            <div className={styles['info-profile__img']}>
              <Image width={100} height={100} src='/media/user.png' alt='Аватар пользователя' />
            </div>
            <div className={styles['info-profile__img-btn']}>
              <button className={prof['profile-body__action']} type='button'>
                Загрузить новое фото
              </button>
            </div>
          </div>
        </label>
      </div>
    </>
  )
}
