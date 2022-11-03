import { getCars } from 'api/Car'
import { getHotTender } from 'api/Company'
import { useObserver } from 'app/hooks'
import { ICarModel } from 'app/models'
import CarBlock from 'modules/templates/CarBlock'
import CarParkBlock from 'modules/templates/CarParkBlock'
import Head from 'next/head'
import { TITLE } from 'app/config'
import React, { useEffect, useRef, useState } from 'react'

export async function getStaticProps() {
  const { data } = await getCars(0, 10)
  return {
    props: {
      cars: data
    }
  }
}

export default function Cars() {
  const [cars, setCars] = useState<ICarModel[]>([])
  const [isLoading, setLoading] = useState(false)
  let [Cars, setTotalCars] = useState(10)
  let triggerElement: React.RefObject<any> = useRef()
  let totalCars = 10

  useEffect(() => {
    getCars(0, totalCars).then(({ data }: { data: any }) => setCars(data))
  }, [totalCars])

  useObserver(triggerElement, true, false, () => {
    getCars(0, totalCars).then(({ data }: { data: any }) => {
      setCars([...cars, ...data])

      totalCars += 10
      setTotalCars(Cars + 10)
    })
  })
  console.log(cars)
  return (
    <>
      <Head>
        <title>Машины | {TITLE}</title>
      </Head>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12
        }}
        getData={getHotTender}
        large={true}
      />
      {cars.length ? (
        <CarBlock title={'Автомобили'} Cars={cars} getData={getCars} />
      ) : (
        <></>
      )}

      <div ref={triggerElement} />
    </>
  )
}
