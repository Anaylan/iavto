import Image from 'next/image'
import { Location } from 'assets/icon/icons'
import { IOrderModel } from 'app/models'
import { Col, Row } from 'react-bootstrap'
import styles from 'assets/sass/components/car/car__item-info.module.scss'
import carList from 'assets/sass/components/card/car-list.module.scss'
import Link from 'next/link'
import { URL_IMG } from 'app/config'
export const OrderCard = ({ order }: { order: IOrderModel }) => {
  console.log(order.status)
  return (
    <Col xs={12} sm={6} lg={12} className={styles['cars__col']}>
      <div className={`${carList['cars-item']}`}>
        <Row>
          <Col xs={12} lg={4} className='d-flex'>
            <Link className={`${carList['cars-item__img']}`} href='#'>
              <Image
                priority={false}
                width={100}
                height={100}
                src={URL_IMG + `/` + order.cid + `/` + order.img![0]}
                alt={`${order.mark} ${order.model}`}
              />
            </Link>
          </Col>
          <Col xs={12} lg={4}>
            <div className={`cars-item__main`}>
              <div className={`${carList['cars-item__main-body']}`}>
                <Link className={`${carList['cars-item__title']}`} href='#'>
                  {order.mark} {order.model}
                  <span>{order.year}</span>
                </Link>
                <div className={carList['cars-item__subtitle']}>
                  Автопарк:<Link href='#'>{order.company_name}</Link>
                </div>
                <div className={styles['cars-item__region']}>
                  <div className={styles['icon']}>
                    <Location color={styles['icon__item']} />
                  </div>
                  <span>Москва</span>
                </div>
              </div>
              <div className='cars-item__btn orders-btn btn-main d-none d-lg-block'>
                Статус заказа:{' '}
                <span>{order.status == 1 ? 'Одобренно' : 'Ожидается'}</span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div className={`${styles['cars-item__info']}`}>
              <div className={`${styles['cars-item__info-content']}`}>
                <div className={`${styles['cars-item__info-body']}`}>
                  <div
                    className={`${styles['cars-item__price']} d-none d-lg-flex`}
                  >
                    <span>{order.price}</span>
                    <div>руб / сут</div>
                  </div>
                  <ul className={`${styles['cars-item__list']}`}>
                    <li>Без залога</li>
                    <li>Без комиссии</li>
                    <li>Есть возможность долгой аренды</li>
                  </ul>
                </div>
                <a
                  className={`${styles['cars-item__btn']} btn-main d-none d-lg-block`}
                  href='#'
                >
                  Подробнее
                </a>
                <div
                  className={`'${styles['cars-item__btn']} ${styles['orders-btn']} btn-main d-lg-none`}
                >
                  Статус заказа:{' '}
                  <span>{order.status == 1 ? 'Одобренно' : 'Ожидается'}</span>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <div className={`${styles['cars-item__price']} d-lg-none`}>
                  <span>2800</span>
                  <div>руб / сут</div>
                </div>
                <a
                  className={`'${styles['cars-item__btn']} btn-main d-lg-none`}
                  href='#'
                >
                  Подробнее
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  )
}
