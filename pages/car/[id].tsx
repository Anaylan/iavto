import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getCar } from 'api/Car';
import { getCarpark, requestVisit } from 'api/Company';

import { TITLE, URL_IMG } from 'app/config';

import { ICarModel, ICarparkModel, ITabItems } from 'app/models';
import { CarInfo, CarparkCard, CarparkInfo } from 'modules/elements';
import {
  ActionFollow,
  CarparkTabs,
  TabFeedback,
  TabProfile,
  TabReviews,
} from 'modules/UI';
import { useRouter } from 'next/router';

export default function Car() {
  const [carpark, setCarpark] = useState<ICarparkModel>();
  const [car, setCar] = useState<ICarModel>();
  const [TabItems, setTabItems] = useState<ITabItems[] | null>();
  const router = useRouter();

  useEffect(() => {
    getCar(Number(router.query.id)).then(({ data }) => {
      setCar(data);
      getCarpark(data.cid).then(({ data }: { data: ICarparkModel }) => {
        setCarpark(data);
      });
      requestVisit(data.id);
    });
  }, []);

  useEffect(() => {
    if (car) {
      setTabItems([
        {
          title: 'Автомобиль',
          eventKey: 'car',
          contentChild: <CarInfo car={car} />,
        },
        {
          title: 'Профиль',
          eventKey: 'profile',
          contentChild: <TabProfile carpark={carpark} />,
        },
        {
          title: 'Отзывы',
          eventKey: 'reviews',
          contentChild: <TabReviews id={`${car.cid}`} />,
        },
        {
          title: 'СВЯЗАТЬСЯ С АВТОПАРКОМ',
          eventKey: 'contact',
          contentChild: <TabFeedback id={`${car.cid}`} />,
        },
      ]);
    }
  }, [car, carpark]);

  return (
    <>
      {car && (
        <>
          <Head>
            <title>
              {car.mark} {car.model} | {TITLE}
            </title>
          </Head>
          <section className='carpark'>
            <Container>
              {carpark ? (
                <div className={`carpark__intro carpark-intro`}>
                  <Image
                    className={'carpark-intro__banner'}
                    src={
                      URL_IMG + '/img/cid/' + carpark.cid + '/' + carpark.banner
                    }
                    fill
                    priority={false}
                    alt={carpark.company_name ? carpark.company_name : ''}
                  />
                  <ActionFollow
                    favorite={carpark.favorite}
                    id={Number(carpark.cid)}
                  />
                  <CarparkCard
                    alt={carpark.company_name}
                    tarif={carpark.tarif}
                    src={
                      URL_IMG + '/img/cid/' + carpark.cid + '/' + carpark.img
                    }
                    title={carpark.company_name}
                    sold={carpark.count_product}
                  />
                  <CarparkInfo
                    orders={carpark.orders_count || 0}
                    rating={carpark.rait || 5}
                  />
                </div>
              ) : null}
            </Container>
            {car && TabItems && <CarparkTabs tabs={TabItems}></CarparkTabs>}
          </section>
        </>
      )}
    </>
  );
}
