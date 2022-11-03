import { getHotTender, getLastTender } from 'api/Company'
import { TITLE } from 'app/config'
import { IHome } from 'app/models'
import type { NextPage } from 'next'
import Head from 'next/head'

import { SearchBlock } from 'modules/templates'
import CarParkBlock from 'modules/templates/CarParkBlock'
import NewsBlock from 'modules/templates/NewsBlock'
import { Container } from 'react-bootstrap'

const Home: NextPage<IHome> = () => {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name='description' content='Поменять' />
        <link rel='icon' href='/favicon.ico' />
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
      <section className='search'>
        <Container>
          <SearchBlock />
        </Container>
      </section>
      <CarParkBlock
        title={'Автопарки'}
        columns={{
          md: 3,
          xs: 12,
          sm: 6,
          lg: '1-5'
        }}
        getData={getLastTender}
        large={false}
      />
      <CarParkBlock
        title={'Новые автопарки'}
        columns={{
          md: 3,
          xs: 12,
          sm: 6,
          lg: '1-5'
        }}
        getData={getLastTender}
        large={false}
      />
      <section className='news'>
        <Container>
          <NewsBlock />
        </Container>
      </section>
    </>
  )
}

export default Home
