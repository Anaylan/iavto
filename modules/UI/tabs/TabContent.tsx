import { getCars, getCarsForCarpark } from 'api/Car';
import { sanitize } from 'libs/functions';
import { ICarModel, ICarparkModel, IReviewModel } from 'app/models';
import { Star } from 'assets/icon/icons';
import CarBlock from 'modules/templates/CarBlock';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { Button } from '../buttons/Button';
import Form from '../forms/Form';
import { Textarea } from '../textarea/textarea';
import { getCarReviews } from 'api/Review';
import { Review } from '../reviews/Review';

export const TabCars = () => {
  const [cars, setCars] = useState<ICarModel[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    getCarsForCarpark(query.id).then((res: any) => {
      setCars(res.data);
    });
  }, [query.id]);

  // console.log(cars)

  return (
    <>
      {cars.length ? (
        <CarBlock title={'Автомобили автопарка'} getData={getCars} />
      ) : (
        <>ПУСТО</>
      )}
    </>
  );
};

export const TabProfile = ({
  carpark,
}: {
  carpark: ICarparkModel | undefined;
}) => {
  return (
    <>
      <h2 className='carpark-profile__title title'>Профиль автопарка</h2>

      <h3 className={'carpark-profile__subtitle'}>Профиль автопарка</h3>

      {carpark && (
        <>
          <div
            className={'carpark-profile__about'}
            dangerouslySetInnerHTML={
              carpark.description ? sanitize(carpark.description) : sanitize('')
            }
          />

          <Row>
            <Col xs={12} sm={4}>
              <h3 className={'carpark-profile__subtitle'}>Оценка товаров</h3>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Средняя оценка автопарка
                </div>
                <div className={'carpark-profile__value'}>
                  <span>{carpark.rait || 5}</span> из 5
                </div>
              </div>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Количество оценок
                </div>
                <div className={'carpark-profile__value'}>
                  <span>Привязать оценку</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <h3 className={'carpark-profile__subtitle'}>
                Количество заказов
              </h3>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Количество заказов
                </div>
                <div className={'carpark-profile__value'}>
                  <span>Привязать количество</span>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export const TabReviews = () => {
  const [reviews, setReviews] = useState<IReviewModel[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    getCarReviews(router.query.id).then(({ data }) => {
      setReviews(data);
      console.log(data);
    });
  }, []);
  return (
    <>
      <Row>
        <Col xs={12} md={8} className='order-2 order-md-1'>
          {reviews &&
            reviews.map((review, key) => <Review review={review} key={key} />)}
        </Col>
        <Col xs={12} md={4} className='order-1 order-md-2'>
          <div className={'carpark-reviews__aside reviews-aside'}>
            <div className={'reviews-aside__content'}>
              <div className={'reviews-aside__top'}>
                <div className={'reviews-aside__rate'}>
                  {Array(5)
                    .fill(1, 0, 4)
                    .map((star, key) => (
                      <div key={key} className={'icon'}>
                        <Star />
                      </div>
                    ))}
                </div>
                <div className={'reviews-aside__overall-rate'}>
                  <span>4.95</span> / 5
                </div>
              </div>
              <div className={'reviews-aside__body'}>
                {Array(5)
                  .fill(1, 0, 4)
                  .map((star, key) => (
                    <div key={key} className={'reviews-aside__progress-item'}>
                      <div className={'reviews-aside__progress-label'}>
                        5 звезд
                      </div>
                      <ProgressBar
                        className={'progress'}
                        min={0}
                        max={100}
                        now={80}
                      />
                      <div className={'reviews-aside__progress-value'}>
                        2657
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export const TabFeedback = () => {
  return (
    <div className={`carpark-contact carpark-tab__body auth`}>
      <h1 className={`cars__title title`}>Задайте ваш вопрос автопарку</h1>
      <Form className={'form'}>
        <div className={'form__item'}>
          <div className={`form__label form__label`}>Ваш вопрос</div>
          <div className={'form__wrap'}>
            <Textarea className={`form__input form__input`} />
          </div>
        </div>

        <div className={'form__bottom'}>
          <div className={'form__btn-group'}>
            <div className={'form__btn-wrap'}>
              <Button className={'btn-main'} type={'submit'}>
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

// Не нужно использовать ошибка связанная с декларацией, вместо него сразу обращаемся к CarInfo
// export const TabCar = ({ car }: { car: ICarModel }) => {
//   // console.log(ca);
//   return <>{/* <CarInfo car={car} /> */}</>;
// };
