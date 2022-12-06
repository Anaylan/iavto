import * as auth from 'app/redux/reducers/authReducer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { UserDataModel, UserModel } from 'app/models';
import { getUserByToken } from 'api/User';

export function checkUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );

  useEffect(() => {
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        if (data.status === 403) {
          router.push('/auth/signin');
        }
        if (user.id !== data.data?.id) {
          dispatch(auth.actions.logout());
        }
      })
      .catch(() => {
        dispatch(auth.actions.logout());
        router.push('/auth/signin');
      });
  }, []);
}
