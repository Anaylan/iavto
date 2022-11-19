import { URL_IMG } from 'app/config';
import Image from 'next/image';
import { FC } from 'react';

interface IImg {
  avatar: string | undefined;
}

export const ProfileImg: FC<IImg> = ({ avatar }) => {
  return (
    <>
      <div className={'info-profile__img-add'}>
        <input type='hidden' id='profileImgAdd' />
        <label htmlFor='profileImgAdd'>
          <div className={'info-profile__img-wrap'}>
            <div className={'info-profile__img'}>
              <Image
                fill
                src={
                  avatar ? URL_IMG + 'users/' + avatar : '/media/user-bg.png'
                }
                alt='Аватар пользователя'
              />
            </div>
            <div className={'info-profile__img-btn'}>
              <button className={'profile-body__action'} type='button'>
                Загрузить новое фото
              </button>
            </div>
          </div>
        </label>
      </div>
    </>
  );
};
