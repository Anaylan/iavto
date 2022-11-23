import Image from 'next/image';
import { Location } from 'assets/icon/icons';
import { IOrderModel } from 'app/models';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import { URL_IMG } from 'app/config';
import { Button, SearchSelect, SearchSelectOption } from 'modules/UI';
import { orderCancel, orderTime } from 'api/Orders';
import { Modal } from 'react-bootstrap';
import { useState, ReactNode } from 'react';
import { dbFormatDate, month } from 'libs/functions';

export const OrderCard = ({ order }: { order: IOrderModel }) => {
  console.log(order);
  const [showTime, setShowTime] = useState<boolean>(false);
  const handleCloseTime = () => setShowTime(false);

  const [fromTo, setFromTo] = useState({
    from: 0,
    to: 0,
    userFrom: order.from_time,
  });
  const handleSelectTime = (from: number, to: number) => {
    setShowTime(false);
    let hourFrom = String((from - (from % 60)) / 60);
    let minutesFrom = String(from % 60);
    let hourTo = String((to - (to % 60)) / 60);
    let minutesTo = String(to % 60);
    orderTime(
      order.id,
      `
    ${
      (hourFrom.length == 1 ? '0' + hourFrom : hourFrom) +
      ':' +
      (minutesFrom.length == 1 ? '0' + minutesFrom : minutesFrom)
    }-${
        (hourTo.length == 1 ? '0' + hourTo : hourTo) +
        ':' +
        (minutesTo.length == 1 ? '0' + minutesTo : minutesTo)
      }`,
    );
  };

  const makeOptions = (from: number, to: number) => {
    from = Number(from);
    to = Number(to);
    let options: ReactNode[] = [];
    let time = from;
    let hour = '';
    let minutes = '';

    for (let i = from / 30; i <= to / 30; i++) {
      hour = String((time - (time % 60)) / 60);
      minutes = String(time % 60);
      options.push(
        <SearchSelectOption
          key={i}
          value={
            time
            // (hour.length == 1 ? '0' + hour : hour) +
            // ':' +
            // (minutes.length == 1 ? '0' + minutes : minutes)
          }>
          {hour.length == 1 ? `0${hour}` : hour}:
          {minutes.length == 1 ? `0${minutes}` : minutes}
        </SearchSelectOption>,
      );
      time += 30;
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
                  <p>
                    {order.status == 1 &&
                      `На ${dbFormatDate(order.order_date, month)}`}
                  </p>
                </span>
              </div>
              <div className='order-card__btns'>
                {order.status == 1 && (
                  <div className='order-btn mb-3'>
                    <Button onClick={() => setShowTime(true)}>
                      Назначить время
                    </Button>
                  </div>
                )}
                {order.status == 2 ||
                  (order.status == 1 && (
                    <div className='order-btn'>
                      <Button
                        onClick={() => {
                          orderCancel(order.id);
                          order.status = 0;
                        }}>
                        Отменить заказ
                      </Button>
                    </div>
                  ))}
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
              <SearchSelect
                onChange={(e) => {
                  setFromTo({
                    ...fromTo,
                    from: Number(e.target.value),
                    userFrom: Number(e.target.value),
                  });
                }}>
                {makeOptions(order.from_time, order.to_time)}
              </SearchSelect>
            </Col>
            <Col xs='6' className='gy-2'>
              <p className='mb-3'>До</p>
              <SearchSelect
                onChange={(e) =>
                  setFromTo({ ...fromTo, to: Number(e.target.value) })
                }>
                {makeOptions(fromTo.userFrom, order.to_time)}
              </SearchSelect>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSelectTime(fromTo.from, fromTo.to)}>
            Выбрать
          </Button>
          <Button className={'btn-main-trp'} onClick={handleCloseTime}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};
