import { Footer } from 'modules/templates';
// import Header from 'modules/templates/Header'
// import Content from '../templates/Content';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ref from 'app/redux/reducers/referralReducer';
import { getUserFavor } from 'api/User';

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

  const expired = useSelector(
    ({ referral }: { referral: ref.IReferralState }) => referral.expired,
  );
  const router = useRouter();

  useEffect(() => {
    getUserFavor().then(({ data }) => {
      console.log(data);
    });
  }, []);

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
  }, [router]);
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
