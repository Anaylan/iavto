import { Footer } from 'modules/templates';
// import Header from 'modules/templates/Header'
// import Content from '../templates/Content';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserByToken } from 'api/User';
import { UserModel } from 'app/models';

import * as ref from 'app/redux/reducers/referralReducer';
import * as auth from 'app/redux/reducers/authReducer';

type Props = {
  children?: React.ReactNode;
};

const DynamicHeader = dynamic(() => import('../templates/Header'), {
  ssr: false,
});

const DynamicContent = dynamic(() => import('../templates/Content'), {
  suspense: true,
  ssr: true,
});

const MasterLayout: React.FC<Props> = ({ children }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector(
    ({ header }: { header: auth.IAuthState }) => header.title,
  );
  const expired = useSelector(
    ({ referral }: { referral: ref.IReferralState }) => referral.expired,
  );
  const router = useRouter();

  useEffect(() => {
    if (expired) {
      const date = new Date().getTime();
      if (date >= expired) {
        dispatch(ref.actions.removeFromRefferal());
      }
    }
    setShowHeader(
      !router.pathname.includes('/auth/') &&
        !router.pathname.includes('/invite'),
    );
    setShowFooter(
      !router.pathname.includes('/auth/') &&
        !router.pathname.includes('/invite') &&
        !router.pathname.includes('/chat'),
    );

    getUserByToken().then(({ data }: { data: UserModel }) => {
      if (!data.data) {
        if (token) {
          dispatch(auth.actions.logout());
        }
      }
    });
  }, [dispatch, expired, router, token]);
  return (
    <>
      {showHeader ? (
        <>
          <DynamicHeader />
          <span id={'mt'} />
        </>
      ) : null}
      <DynamicContent>{children}</DynamicContent>
      {showFooter ? <Footer /> : null}
    </>
  );
};

export { MasterLayout };
