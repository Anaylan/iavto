import {
  getCarsCount,
  getCompaniesCount,
  getOrdersCount,
  getReviewsCount,
  getUserByToken,
} from 'api/User';
import { getHotTender } from 'api/Company';
import { TITLE } from 'app/config';
import { UserModel } from 'app/models';
import { UserDataModel } from 'app/models';
import {
  ProfileBalance,
  ProfileCard,
  ProfileDescription,
  ProfileFavorites,
  ProfileOrders,
  ProfileParthners,
  ProfileReviews,
  ProfileSettings,
  ProfileSupport,
} from 'modules/elements/profile/profile';
import CarParkBlock from 'modules/templates/CarParkBlock';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as auth from 'app/redux/reducers/authReducer';
import { wrapper } from 'app';

// export async function getServerSideProps() {
//   // auth.dispatch(auth.authReducer.requestUser());
//   const { data } = await getUserByToken();
//   return { props: { user1: data } };
// }

const Profile = () => {
  const [profile, setProfile] = useState<UserModel>({
    data: null,
    status: 200,
  });
  const dispatch = useDispatch();
  const [orderCount, setOrderCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [carCount, setCarCount] = useState<number>(0);
  const router = useRouter();
  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );

  // const dispatch = useDispatch();
  // const [copySuccess, setCopySuccess] = useState('');
  // const router = useRouter();
  // useEffect(() => {
  //   // setProfile(user);
  //   if (profile.status == 403) {
  //     router.push('auth/signin');
  //   }
  // }, [profile, dispatch, router]);

  useEffect(() => {
    // setProfile(user);
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        if (data.status === 403) {
          router.push('/auth/signin');
        }
        if (user.id == data.data?.id) {
          setProfile(data);
        } else {
          dispatch(auth.actions.logout());
          router.push('/');
          console.log(data);
        }
      })
      .catch((err) => {
        dispatch(auth.actions.logout());
        router.push('/');
        console.log('oh no!' + err);
      });

    getOrdersCount().then(({ data }) => {
      setOrderCount(data);
    });
    getReviewsCount().then(({ data }) => {
      setReviewCount(data);
    });

    getCarsCount().then(({ data }) => {
      setCarCount(data);
    });
    getCompaniesCount().then(({ data }) => {
      setCompanyCount(data);
    });
  }, [user, dispatch, router]);

  return (
    <>
      <Head>
        <title>Профиль | {TITLE}</title>
      </Head>
      <section className='profile'>
        <Container>
          <div className='profile__body'>
            {profile.data && (
              <>
                <Row className={'profile__row'}>
                  <ProfileCard profile={profile.data} />
                  <ProfileDescription description={profile.data.description} />
                </Row>
                <Row className='profile__row'>
                  <ProfileParthners
                    balance={profile.data.partners_balance.replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1 ',
                    )}
                  />
                  <ProfileBalance
                    balance={profile.data.balance.replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1 ',
                    )}
                  />
                  <ProfileFavorites data={carCount} type={1} />
                </Row>
                <Row className='profile__row'>
                  <ProfileOrders data={orderCount} />
                  <ProfileReviews data={reviewCount} />
                  <ProfileFavorites data={companyCount} type={0} />
                </Row>
                <Row className='profile__row'>
                  <ProfileSettings />
                  <ProfileSupport />
                </Row>
              </>
            )}
          </div>
        </Container>
      </section>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12,
        }}
        getData={getHotTender}
        large={true}
      />
    </>
  );
};

export default Profile;
