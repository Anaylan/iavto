import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { getCar } from 'api/Car'
import { getCarpark } from 'api/Company'

import { TITLE, URL_IMG } from 'app/config'

import { ICarModel, ICarparkModel, ITabItems } from 'app/models'
import { CarparkCard, CarparkInfo } from 'modules/elements'
import {
  ActionFollow,
  CarparkTabs,
  TabCar,
  TabFeedback,
  TabProfile,
  TabReviews
} from 'modules/UI'

export async function getServerSideProps({ params }: any) {
  const { data } = await getCar(params.id)
  return {
    props: {
      car: data
    }
  }
}

export default function Car({ car }: { car: ICarModel }) {
  console.log(car)
  const [carpark, setCarpark] = useState<ICarparkModel>()

  useEffect(() => {
    getCarpark(car.cid).then(({ data }: { data: ICarparkModel }) => {
      setCarpark(data)
    })
  }, [car])

  const TabItems: ITabItems[] = [
    {
      title: 'Автомобиль',
      eventKey: 'car',
      contentChild: <TabCar car={car} />
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

  return (
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
                src={URL_IMG + carpark.cid + '/' + carpark.banner}
                fill
                alt={carpark.company_name ? carpark.company_name : ''}
              />
              <ActionFollow />
              <CarparkCard
                alt={carpark.company_name}
                tarif={carpark.tarif}
                src={URL_IMG + carpark.cid + '/' + carpark.img}
                title={carpark.company_name}
                sold={carpark.count_product}
              />
              <CarparkInfo
                orders={carpark.geo_city}
                rating={carpark.rait || 5}
              />
            </div>
          ) : null}
        </Container>
        {car && <CarparkTabs tabs={TabItems}></CarparkTabs>}
      </section>
    </>
  )
}
