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

export const OrderCard = ({
  order,
  user,
  changeInvoke,
}: {
  order: IOrderModel;
  user: any;
  changeInvoke: () => void;
}) => {
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
    order.user_time = `
      ${
        (hourFrom.length == 1 ? '0' + hourFrom : hourFrom) +
        ':' +
        (minutesFrom.length == 1 ? '0' + minutesFrom : minutesFrom)
      }-${
      (hourTo.length == 1 ? '0' + hourTo : hourTo) +
      ':' +
      (minutesTo.length == 1 ? '0' + minutesTo : minutesTo)
    }`;
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
            <Link className={`cars-item__img`} href={`/car/${order.pid}`}>
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
                      `Назначено на ${dbFormatDate(order.order_date, month)} ${
                        order.user_time ? order.user_time : ''
                      }`}
                  </p>
                </span>
              </div>
              <div className='order-card__btn-group'>
                {
                  window.innerWidth >= 992 ? order.status == 1 &&
                  (order.user_time == '' || order.user_time == null) && (
                    <div className='order-card__btn-wrap'>
                      <Button
                        onClick={() => {
                          setShowTime(true);
                          changeInvoke();
                        }}>
                        Назначить время
                      </Button>
                    </div>
                  ) : null
                }
                {
                  window.innerWidth >= 992 ? order.status == 2 ||
                  (order.status == 1 && (
                    <div className='order-card__btn-wrap'>
                      <Button
                        className='btn-main-trp'
                        onClick={() => {
                          orderCancel(order.id);
                          changeInvoke();
                        }}>
                        Отменить заказ
                      </Button>
                    </div>
                  )) : null
                }
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
                <Link
                  className={`cars-item__btn btn-main d-none d-lg-block`}
                  href={`/car/${order.pid}`}>
                  Подробнее
                </Link>
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
                    <p>
                      {order.status == 1 &&
                        `Назначено на ${dbFormatDate(
                          order.order_date,
                          month,
                        )} ${order.user_time ? order.user_time : ''}`}
                    </p>
                  </span>
                </div>
                <div className='order-card__btn-group'>
                {
                  window.innerWidth <= 991 ? order.status == 1 &&
                  (order.user_time == '' || order.user_time == null) && (
                    <div className='order-card__btn-wrap'>
                      <Button
                        onClick={() => {
                          setShowTime(true);
                          changeInvoke();
                        }}>
                        Назначить время
                      </Button>
                    </div>
                  ) : null
                }
                {
                  window.innerWidth <= 991 ? order.status == 2 ||
                  (order.status == 1 && (
                    <div className='order-card__btn-wrap'>
                      <Button
                        className='btn-main-trp'
                        onClick={() => {
                          orderCancel(order.id);
                          changeInvoke();
                        }}>
                        Отменить заказ
                      </Button>
                    </div>
                  )) : null
                }
              </div>
              </div>
              <div className='d-flex align-items-center justify-content-between'>
                <div className={`cars-item__price d-lg-none`}>
                  <span>2800</span>
                  <div>руб / сут</div>
                </div>
                <Link className={`cars-item__btn btn-main d-lg-none`} href={`/car/${order.pid}`}>
                  Подробнее
                </Link>
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
              <p className='mb-2'>С</p>
              <div className='select-wrap'>
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
              </div>
            </Col>
            <Col xs='6' className='gy-2'>
              <p className='mb-2'>До</p>
              <div className='select-wrap'>
                <SearchSelect
                  onChange={(e) =>
                    setFromTo({ ...fromTo, to: Number(e.target.value) })
                  }>
                  {makeOptions(fromTo.userFrom, order.to_time)}
                </SearchSelect>
              </div>
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
