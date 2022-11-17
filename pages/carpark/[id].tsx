import { getCarpark } from 'api/Company'
import { TITLE, URL_IMG } from 'app/config'
import { ICarparkModel, ITabItems } from 'app/models'
import { CarparkCard, CarparkInfo } from 'modules/elements'
import {
  ActionFollow,
  CarparkTabs,
  TabCars,
  TabFeedback,
  TabProfile,
  TabReviews
} from 'modules/UI'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'react-bootstrap'

export async function getServerSideProps({ params }: any) {
  const res = await getCarpark(params.id)

  return {
    props: {
      autopark: res.data
    }
  }
}

const TabItems: ITabItems[] = [
  {
    title: 'Автомобили',
    eventKey: 'cars',
    contentChild: <TabCars />
  },
  {
    title: 'Профиль',
    eventKey: 'profile',
    contentChild: <TabProfile />
  },
  {
    title: 'Отзывы',
    eventKey: 'reviews',
    contentChild: <TabReviews />
  },
  {
    title: 'СВЯЗАТЬСЯ С АВТОПАРКОМ',
    eventKey: 'contact',
    contentChild: <TabFeedback />
  }
]

export default function Carpark({ autopark }: { autopark: ICarparkModel }) {
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
                  src={URL_IMG + autopark.cid + '/' + autopark.banner}
                  fill
                  alt={autopark.company_name ? autopark.company_name : ''}
                />
                <ActionFollow />
                <CarparkCard
                  alt={autopark.company_name}
                  tarif={autopark.tarif}
                  src={URL_IMG + autopark.cid + '/' + autopark.img}
                  title={autopark.company_name}
                  sold={autopark.count_product}
                />
                <CarparkInfo
                  orders={autopark.geo_city}
                  rating={autopark.rait || 5}
                />
              </div>
            </Container>
            <CarparkTabs tabs={TabItems}></CarparkTabs>
          </section>
        </>
      )}
    </>
  )
}
