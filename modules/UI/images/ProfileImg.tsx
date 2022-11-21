import { requestSendImg } from 'api/User';
import { URL_IMG } from 'app/config';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useRef } from 'react';

interface IImg {
  avatar: string | undefined;
  id: number;
}

export const ProfileImg: FC<IImg> = ({ avatar, id }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      const formData = new FormData();
      formData.append('file', e.target.files![0]);
      requestSendImg(formData).then(({ data }) => {
        data;
      });
    }
  };

  return (
    <>
      <div className={'info-profile__img-add'}>
        <input
          style={{ opacity: 0, visibility: 'hidden', position: 'absolute' }}
          id='profileImgAdd'
          type='file'
          onChange={onChange}
        />
        <label htmlFor='profileImgAdd'>
          <div className={'info-profile__img-wrap'}>
            <div className={'info-profile__img'}>
              <Image
                fill
                src={
                  avatar
                    ? URL_IMG + '/img/uid/' + id + '/' + avatar
                    : '/media/user-bg.png'
                }
                alt='Аватар пользователя'
              />
            </div>
            <div className={'info-profile__img-btn'}>
              <button className={'profile-body__action'}>
                Загрузить новое фото
              </button>
            </div>
          </div>
        </label>
      </div>
    </>
  );
};
