import Image from 'next/image';
import { Location } from 'assets/icon/icons';
import { IOrderModel } from 'app/models';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { URL_IMG } from 'app/config';
import { Button, SearchSelect, SearchSelectOption } from 'modules/UI';
import { orderCancel } from 'api/Orders';
import { Modal } from 'react-bootstrap';
import { useState, ReactNode } from 'react';

export const OrderCard = ({ order }: { order: IOrderModel }) => {
  console.log(order);
  const [showTime, setShowTime] = useState<boolean>(false);
  const handleCloseTime = () => setShowTime(false);
  const [from, setFrom] = useState(0);
  const makeOptions = (from?: number) => {
    let options: ReactNode[] = [];
    let time = 0;
    let hour = '';
    let minutes = '';
    if (from) {
      let time = 30 * from;
      for (let i = from; i < 48; i++) {
        hour = String((time - (time % 60)) / 60);
        minutes = String(time % 60);
        options.push(
          <SearchSelectOption value={i}>
            <time>
              {hour.length == 1 ? `0${hour}` : hour}:
              {minutes.length == 1 ? `0${minutes}` : minutes}
            </time>
          </SearchSelectOption>,
        );
        time += 30;
      }
    } else {
      for (let i = 0; i < 48; i++) {
        hour = String((time - (time % 60)) / 60);
        minutes = String(time % 60);
        options.push(
          <SearchSelectOption value={i}>
            <time>
              {hour.length == 1 ? `0${hour}` : hour}:
              {minutes.length == 1 ? `0${minutes}` : minutes}
            </time>
          </SearchSelectOption>,
        );
        time += 30;
      }
    }
    return options;
  };

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
                src={URL_IMG + '/img/cid/' + order.cid + `/` + order.img![0]}
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
                <span>
                  {
                    {
                      0: <span>Отказано</span>,
                      1: <span>Одобренно</span>,
                      2: <span>Ожидается</span>,
                      3: <span>Активен</span>,
                      4: <span>Архив</span>,
                    }[order.status]
                  }
                </span>
              </div>
              <div className='order-card__btns'>
                {order.status == 1 && (
                  <div className='order-btn'>
                    <Button onClick={() => setShowTime(true)}>
                      Назначить время
                    </Button>
                  </div>
                )}
                {order.status == 2 && (
                  <div className='order-btn'>
                    <Button
                      onClick={() => {
                        orderCancel(order.id);
                        order.status = 0;
                      }}>
                      Отменить заказ
                    </Button>
                  </div>
                )}
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
                    {order.pledge == 0 ? (
                      <li>Без залога</li>
                    ) : (
                      <li>
                        Залог <span>{order.pledge}</span> руб
                      </li>
                    )}
                    {/* <li>Без комиссии</li>
                    <li>Есть возможность долгой аренды</li> */}
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
                  Статус заказа:
                  <span>
                    {
                      {
                        0: <span>Отказано</span>,
                        1: <span>Одобренно</span>,
                        2: <span>Ожидается</span>,
                        3: <span>Активен</span>,
                        4: <span>Архив</span>,
                      }[order.status]
                    }
                  </span>
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
      <Modal centered show={showTime} onHide={handleCloseTime}>
        <Modal.Header closeButton>
          <Modal.Title>Выбор времени</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs='6' className='gy-2'>
              <p className='mb-3'>С</p>
              <SearchSelect onChange={(e) => setFrom(Number(e.target.value))}>
                {makeOptions()}
              </SearchSelect>
            </Col>
            <Col xs='6' className='gy-2'>
              <p className='mb-3'>До</p>
              <SearchSelect>{makeOptions(from)}</SearchSelect>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseTime}>Выбрать</Button>
          <Button className={'btn-main-trp'} onClick={handleCloseTime}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};
