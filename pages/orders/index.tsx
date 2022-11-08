// import { SearchBlock } from 'modules/templates'
import { Container, Row } from 'react-bootstrap'
import { TITLE } from 'app/config'
import Head from 'next/head'
// import form from 'assets/sass/components/form.module.scss'
export default function Orders() {
  return (
    <>
      <Head>
        <title>Мои заказы | {TITLE}</title>
      </Head>
      <section className='search search-min'>
        <Container>
          <div className='search__body'>
            <h2 className='search__title title'>
              Поиск автомобилей по параметрам
            </h2>
            <Row>
              {/* <SearchBlock /> */}
              {/* <SearchBodyOrders/> */}
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}
