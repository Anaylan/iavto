import { getUserFavor } from 'api/User';
import { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { TITLE } from 'app/config';
import { IFavoritesModel } from 'app/models/favorite/Favorites';
import { CarItem } from 'modules/templates/CarBlock';
import { CarparkItem } from 'modules/templates/CarParkBlock';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import * as auth from 'app/redux/reducers/authReducer';

import 'swiper/css';
import 'swiper/css/pagination';
import { EmptyComponent } from 'modules/elements';

export default function Favorites() {
  const [favorites, setFavorites] = useState<IFavoritesModel | null>(null);
  const router = useRouter();
  const authen = useSelector(
    ({ header }: { header: auth.IAuthState }) => header.user,
  );

  useEffect(() => {
    if (!authen) {
      router.push('/auth/signin');
    }
  }, [authen, router]);

  useEffect(() => {
    getUserFavor().then(({ data }) => {
      setFavorites(data);
    });
  }, []);

  // TODO: Обновление получаемых данных
  // const [isLoading, Errors] = useFetch(() => {
  //   getData(0, totalCars, { ...router.query })
  //     .then(({ data }: { data: ICarModel[] }) => {
  //       setCars([...cars, ...data]);
  //       console.log(data);
  //       // window.location.reload()
  //     })
  //     .catch((err: string) => {});
  // });

  // useObserver(triggerElement, true, isLoading, () => {
  //   getData(0, totalCars, { ...router.query })
  //     .then(({ data }: { data: ICarModel[] }) => {
  //       console.log(data);
  //       setCars([...cars, ...data]);
  //       totalCars += 10;
  //     })
  //     .catch((err: string) => {});
  // });

  return (
    <>
      <Head>
        <title>Избранное | {TITLE}</title>
      </Head>
      <section className={'carparks carparks-slider'}>
        <Container>
          <h1 className='title'>Автопарки</h1>
          <div className='carparks__body'>
            {favorites ? (
              <>
                {favorites.company.length > 0 ? (
                  <Swiper
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={24}
                    grabCursor={true}
                    slidesPerView={1}
                    loop={favorites ? favorites?.company.length > 5 : false}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className={'carparks-slider__container'}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    breakpoints={{
                      576: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                      },
                      768: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                      },
                      1025: {
                        slidesPerView: 5,
                        spaceBetween: 39,
                      },
                    }}>
                    {/* {Array(10)
                .fill(1, 1, 20)
                .map((item, key) => (
                  <SwiperSlide key={key}>
                    <Image
                      alt=''
                      src={'/media/carpark.png'}
                      sizes={'100%'}
                      fill
                    />
                  </SwiperSlide>
                ))} */}

                    {favorites.company.map((company, key: number) => (
                      <SwiperSlide key={key}>
                        <CarparkItem lazy={true} carPark={company} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <EmptyComponent />
                )}
              </>
            ) : (
              <>
                <EmptyComponent />
              </>
            )}
          </div>
        </Container>
      </section>
      <section className={'cars'}>
        <Container>
          <h2 className='title'>Автомобили</h2>
          {favorites ? (
            <>
              {favorites.car.length ? (
                favorites.car.map((car, key: number) => (
                  <CarItem car={car} key={key} />
                ))
              ) : (
                <EmptyComponent />
              )}
            </>
          ) : (
            <EmptyComponent />
          )}
        </Container>
      </section>
    </>
  );
}
