import { getCarpark } from 'api/Company';
import { TITLE, URL_IMG } from 'app/config';
import { ICarparkModel, ITabItems } from 'app/models';
import { CarparkCard, CarparkInfo } from 'modules/elements';
import {
  ActionFollow,
  CarparkTabs,
  TabCars,
  TabFeedback,
  TabProfile,
  TabReviews,
} from 'modules/UI';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export default function Carpark() {
  const [autopark, setAutopark] = useState<ICarparkModel>();
  const router = useRouter();
  const [TabItems, setTabItems] = useState<ITabItems[]>([]);
  useEffect(() => {
    getCarpark(Number(router.query.id)).then(({ data }) => {
      setAutopark(data);
      setTabItems([
        {
          title: 'Автомобили',
          eventKey: 'cars',
          contentChild: <TabCars />,
        },
        {
          title: 'Профиль',
          eventKey: 'profile',
          contentChild: <TabProfile carpark={data} />,
        },
        {
          title: 'Отзывы',
          eventKey: 'reviews',
          contentChild: <TabReviews id={`${data.cid}`} />,
        },
        {
          title: 'СВЯЗАТЬСЯ С АВТОПАРКОМ',
          eventKey: 'contact',
          contentChild: <TabFeedback id={`${data.cid}`} />,
        },
      ]);
    });
  }, []);

  return (
    <>
      {autopark && (
        <>
          <Head>
            <title>
              {autopark.company_name} | {TITLE}
            </title>
          </Head>
          <section className={`carpark`}>
            <Container>
              <div className={`carpark__intro carpark-intro`}>
                <Image
                  className={'carpark-intro__banner'}
                  src={
                    URL_IMG + '/img/cid/' + autopark.cid + '/' + autopark.banner
                  }
                  fill
                  alt={autopark.company_name ? autopark.company_name : ''}
                />
                <ActionFollow
                  favorite={autopark.favorite}
                  id={Number(autopark.cid)}
                />
                <CarparkCard
                  alt={autopark.company_name}
                  tarif={autopark.tarif}
                  src={
                    URL_IMG + '/img/cid/' + autopark.cid + '/' + autopark.img
                  }
                  title={autopark.company_name}
                  sold={autopark.count_product}
                />
                <CarparkInfo
                  orders={autopark.orders_count || 0}
                  rating={autopark.rait || 5}
                />
              </div>
            </Container>
            {TabItems.length > 0 ? (
              <CarparkTabs tabs={TabItems}></CarparkTabs>
            ) : null}
          </section>
        </>
      )}
    </>
  );
}
