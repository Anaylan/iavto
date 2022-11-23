import { getCars, getCarsForCarpark } from 'api/Car';
import { getStars, sanitize } from 'libs/functions';
import { ICarModel, ICarparkModel, IReviewModel } from 'app/models';
import CarBlock from 'modules/templates/CarBlock';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { Button } from '../buttons/Button';
import Form from '../forms/Form';
import { Textarea } from '../textarea/textarea';
import { getCompanyReviews } from 'api/Review';
import { Review } from '../reviews/Review';
import { useFormik } from 'formik';
import { countAndFormatMonth } from 'libs/functions';
import { EmptyComponent } from 'modules/elements';
import { sendMessage } from 'api/Chat';

export const TabCars = () => {
  const [cars, setCars] = useState<ICarModel[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    getCarsForCarpark(query.id).then((res: any) => {
      setCars(res.data);
    });
  }, [query.id]);

  return (
    <>
      {cars.length ? (
        <CarBlock title={'Автомобили автопарка'} getData={getCars} />
      ) : (
        <EmptyComponent />
      )}
    </>
  );
};

export const TabProfile = ({
  carpark,
}: {
  carpark: ICarparkModel | undefined;
}) => {
  console.log(carpark);
  return (
    <>
      <h2 className='carpark-profile__title title'>Профиль автопарка</h2>

      <h3 className={'carpark-profile__subtitle'}>Профиль автопарка</h3>

      {carpark && (
        <>
          <div
            className={'carpark-profile__about '}
            dangerouslySetInnerHTML={
              carpark.description ? sanitize(carpark.description) : sanitize('')
            }
          />
          <h3 className={'carpark-profile__subtitle'}>
            Информация об автопарке
          </h3>
          <Row>
            <Col xs={12} sm={4}>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Средняя оценка автопарка
                </div>
                <div className={'carpark-profile__value'}>
                  <span>
                    {carpark.rait ? Math.round(carpark.rait * 10) / 10 : 5}
                  </span>{' '}
                  из 5
                </div>
              </div>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Количество оценок
                </div>
                <div className={'carpark-profile__value'}>
                  <span>{carpark.rating_count}</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Количество заказов
                </div>
                <div className={'carpark-profile__value'}>
                  <span>{carpark.orders_count}</span>
                </div>
              </div>
              <div className={'carpark-profile__info'}>
                <div className={'carpark-profile__label'}>
                  Время вместе с ЯАВТОРФ
                </div>
                <div className={'carpark-profile__value'}>
                  <span>{countAndFormatMonth(carpark.created)}</span>
                </div>
                {/* Бох */}
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export const TabReviews = ({ id }: { id: string }) => {
  const [reviews, setReviews] = useState<IReviewModel | null>(null);

  useEffect(() => {
    getCompanyReviews(id).then(({ data }) => {
      setReviews(data);
      console.log(data);
    });
  }, [id]);

  return (
    <>
      {reviews && (
        <Row>
          <Col xs={12} md={8} className='order-2 order-md-1'>
            {reviews.reviews.map((review, key) => (
              <Review review={review} key={key} />
            ))}
          </Col>
          <Col xs={12} md={4} className='order-1 order-md-2'>
            <div className={'carpark-reviews__aside reviews-aside'}>
              <div className={'reviews-aside__content'}>
                <div className={'reviews-aside__top'}>
                  <div className={'reviews-aside__rate'}>
                    {getStars(Math.floor(reviews.aveRating))}
                    {/* {Array(5)
                    .fill(1, 0, 4)
                    .map((star, key) => (
                      <div key={key} className={'icon'}>
                        <Star />
                      </div>
                    ))} */}
                  </div>
                  <div className={'reviews-aside__overall-rate'}>
                    <span>{Math.round(reviews.aveRating * 10) / 10}</span> / 5
                  </div>
                </div>
                <div className={'reviews-aside__body'}>
                  {reviews.count.map((star, key) => (
                    <div key={key} className={'reviews-aside__progress-item'}>
                      <div className={'reviews-aside__progress-label'}>
                        {star.id} звезд
                      </div>
                      <ProgressBar
                        className={'progress'}
                        min={0}
                        max={100}
                        now={star.percent}
                      />
                      <div className={'reviews-aside__progress-value'}>
                        {star.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export const TabFeedback = ({ id }: { id: string }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      sendMessage(id, values.text).then(({ data }) => {
        console.log(data);
        if (data) {
          router.push(`/chat?dialog=${data}`);
        }
      });
    },
  });
  return (
    <div className='carpark-contact carpark-tab__body'>
      <h1 className={`cars__title title`}>Задайте ваш вопрос автопарку</h1>
      <Form onSubmit={formik.handleSubmit} className={'form'}>
        <div className={'form__item'}>
          <div className={`form__label form__label`}>Ваш вопрос</div>
          <div className={'form__wrap'}>
            <Textarea
              onChange={formik.handleChange}
              id={'text'}
              className={`form__input form__input`}
            />
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
