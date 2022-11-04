import { getCars } from 'api/Car'
import { getHotTender } from 'api/Company'
import { TITLE } from 'app/config'
import { useFetch, useObserver } from 'app/hooks'
import { ICarModel } from 'app/models'
import { Load } from 'assets/icon/icons'
import CarBlock from 'modules/templates/CarBlock'
import CarParkBlock from 'modules/templates/CarParkBlock'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
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
  let [Cars, setTotalCars] = useState(10)
  let triggerElement: React.RefObject<any> = useRef()
  let totalCars = 10

  const [fetchCars, isLoading, Errors] = useFetch(async () => {
    const {data}: {data: ICarModel[]} = getCars(0, totalCars);
    setCars([...cars, ...data])
  })


  // useEffect(() => {
  //   getCars(0, totalCars).then(({ data }: { data: any }) => setCars(data))
  // }, [totalCars])
  useObserver(triggerElement, true, isLoading, () => {
    getCars(0, totalCars).then(({ data }: { data: any }) => {
      setCars([...cars, ...data])

      totalCars += 10
      setTotalCars(Cars + 10)
    })
  })
  console.log(isLoading)
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
        <>Пусто</>
      )}
      
      <div ref={triggerElement} />
      {isLoading && (<><div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Load/></div></>)}
    </>
  )
}
function fetchCars(arg0: number) {
    throw new Error('Function not implemented.')
}

