// import { SearchBlock } from 'modules/templates'
import { Container, Row } from 'react-bootstrap'
import { TITLE } from 'app/config'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { getUserOrders } from 'api/Orders'
// import form from 'assets/sass/components/form.module.scss'
import Image from 'next/image'
import { OrderCard } from 'modules/elements'
import { IOrderModel } from 'app/models/order/Order'

export default function Orders() {
  const [orders, setOrders] = useState<IOrderModel[]>([])

  useEffect(() => {
    getUserOrders().then(({ data }: { data: IOrderModel[] }) => {
      setOrders(data)
    })
  }, [])

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
              <section className='cars orders'>
                <div className='container'>
                  <h1 className='cars__title title title-center'>Сентябрь</h1>

                  <Row>
                    {orders.map((order, key) => (
                      <Fragment key={key}>
                        <OrderCard order={order} />
                      </Fragment>
                    ))}
                  </Row>
                </div>
              </section>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}
