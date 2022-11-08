import { getCars } from 'api/Car'
import { getHotTender } from 'api/Company'
import { TITLE } from 'app/config'
// import CarBlock from 'modules/templates/CarBlock'
import CarParkBlock from 'modules/templates/CarParkBlock'
import Head from 'next/head'
import dynamic from 'next/dist/shared/lib/dynamic'

const DynamicCarBlock = dynamic(() => import('modules/templates/CarBlock'))

export default function Cars() {
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
      <DynamicCarBlock title={'Автомобили'} getData={getCars} />
    </>
  )
}
// function fetchCars(arg0: number) {
//   throw new Error('Function not implemented.')
// }
