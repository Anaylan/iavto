import Image from 'next/image';
import { Location } from 'assets/icon/icons';
import { IOrderModel } from 'app/models';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { URL_IMG } from 'app/config';
export const OrderCard = ({ order }: { order: IOrderModel }) => {
  console.log(order);
  return (
    <Col xs={12} sm={6} lg={12} className={'cars__col'}>
      <div className={`cars-item`}>
        <Row>
          <Col xs={12} lg={4} className='d-flex'>
            <Link className={`cars-item__img`} href='#'>
              <Image
                priority={false}
                fill
                sizes='100%'
                src={URL_IMG + `/` + order.cid + `/` + order.img![0]}
                alt={`${order.mark} ${order.model}`}
              />
            </Link>
          </Col>
          <Col xs={12} lg={4}>
            <div className={`cars-item__main`}>
              <div className={`cars-item__main-body`}>
                <Link className={`cars-item__title`} href={`/car/${order.pid}`}>
                  {order.mark} {order.model}
                  <span>{order.year}</span>
                </Link>
                <div className={'cars-item__subtitle'}>
                  Автопарк:
                  <Link href={`/carpark/${order.cid}`}>
                    {order.company_name}
                  </Link>
                </div>
                <div className={'cars-item__region'}>
                  <div className={'icon'}>
                    <Location />
                  </div>
                  <span>Москва</span>
                </div>
              </div>
              <div
                className={
                  'cars-item__btn orders-btn btn-main d-none d-lg-block ' +
                  (order.status == 1 ? '' : 'orders-btn-wait')
                }>
                Статус заказа:{' '}
                <span>{order.status == 1 ? 'Одобренно' : 'Ожидается'}</span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <div className={`cars-item__info`}>
              <div className={`cars-item__info-content`}>
                <div className={`cars-item__info-body`}>
                  <div className={`cars-item__price d-none d-lg-flex`}>
                    <span>{order.price}</span>
                    <div>руб / сут</div>
                  </div>
                  <ul className={`cars-item__list`}>
                    <li>Без залога</li>
                    <li>Без комиссии</li>
                    <li>Есть возможность долгой аренды</li>
                  </ul>
                </div>
                <a
                  className={`cars-item__btn btn-main d-none d-lg-block`}
                  href='#'>
                  Подробнее
                </a>
                <div
                  className={
                    `'cars-item__btn orders-btn btn-main d-lg-none ` +
                    (order.status == 1 ? '' : 'orders-btn-wait')
                  }>
                  Статус заказа:{' '}
                  <span>{order.status == 1 ? 'Одобренно' : 'Ожидается'}</span>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <div className={`cars-item__price d-lg-none`}>
                  <span>2800</span>
                  <div>руб / сут</div>
                </div>
                <a className={`cars-item__btn btn-main d-lg-none`} href='#'>
                  Подробнее
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
