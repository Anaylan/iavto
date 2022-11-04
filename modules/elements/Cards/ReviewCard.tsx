import { Star } from 'assets/icon/icons';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import carList from '/assets/sass/components/card/car-list.module.scss';
import carparkReviews from '/assets/sass/components/carpark/carpark-reviews.module.scss';
import reviews from '/assets/sass/components/reviews/reviews.module.scss';

export const ReviewCard = () => {
  return (
    <Col xs={12} className={reviews["reviews__col"]}>
        <div className={`${reviews['carpark-reviews__item']} ${carList['cars-item']}`}>
            <Row>
                <Col xs={12} md={4} className="d-flex">
                    <Link className={carList['cars-item__img']} href="#">                  
                    <Image src='/media/sber-banner.png' width={100} height={100} alt=''/>
                    </Link>
                </Col>
                <Col xs={12} md={8}>
                    <div className={carparkReviews['carpark-reviews__top']}>
                        <div className="d-flex flex-column order-2 order-md-1">
                            <Link className={carList["cars-item__title"]} href="#">Hyundai Sonata Sonata Sonata<span>2021</span></Link>
                            <div className={carList["cars-item__subtitle"]}>Автопарк:<a href="#">АвтоПрофи</a></div>
                            <div className={carList["cars-item__price"]}>
                                <span>2800</span><div>руб / сут</div>
                            </div>
                        </div>
                        <div className={`${reviews['reviews__rate']} order-1 d-flex justify-content-between justify-content-md-end order-md-2 `}>
                            <div className="d-flex">
                                <time className={carparkReviews['carpark-reviews__date']} dateTime="2022-04-22">22 Апреля 2022</time>
                                <div className={carparkReviews['carpark-reviews__rate']}>
                                    <div className={carparkReviews['icon']}>
                                        <Star color={carparkReviews['icon__item']} />
                                    </div>
                                    <div className={carparkReviews['icon']}>
                                        <Star color={carparkReviews['icon__item']} />
                                    </div>
                                    <div className={carparkReviews['icon']}>
                                        <Star color={carparkReviews['icon__item']} />
                                    </div>
                                    <div className={carparkReviews['icon']}>
                                        <Star color={carparkReviews['icon__item']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={carparkReviews['carpark-reviews__comment']}>
                        <div className={carparkReviews['carpark-reviews__text']}>
                            <span>Комментарий:</span>
                            <p>Я брать машина на сутки. Все класс. Парк хороший. Авто хороший. Звонил хорошо. Машина не ломаться, руль крутиться, коляса поворачиваться. Потом яма была, в яму упала, я жив. Права теперь нет, автопарк сказал, что машина должен вернуть, я машина вернуть в состоянии плохой. Но парк сказал, что машина не плохой. Надо кредит брать, помогите кто нибудь лада купить</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </Col>
  )
}
