import { getUserByToken, requestSendImg } from 'api/User';
import { URL_IMG } from 'app/config';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import * as auth from 'app/redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataModel } from 'app/models';

export const ProfileImg = () => {
  const dispatch = useDispatch();
  const user: UserDataModel = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      const formData = new FormData();
      formData.append('file', e.target.files![0]);
      requestSendImg(formData).then(({ data }) => {
        getUserByToken().then(({ data }) => {
          if (data.data) {
            dispatch(auth.actions.fulfillUser(data.data));
          }
        });
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
                  user.avatar
                    ? URL_IMG + '/img/uid/' + user.id + '/' + user.avatar
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
