import { getCars, getCarsForCarpark } from 'api/Car'
import { getCarpark } from 'api/Company'
import { useSanitize } from 'app/hooks'
import { ICarModel, ICarparkModel } from 'app/models'
import { Star } from 'assets/icon/icons'
import feedback from 'assets/sass/components/carpark/carpark-contact.module.scss'
import profile from 'assets/sass/components/carpark/carpark-profile.module.scss'
import reviews from 'assets/sass/components/carpark/carpark-reviews.module.scss'
import reviews_aside from 'assets/sass/components/carpark/reviews-aside.module.scss'
import form from 'assets/sass/components/form.module.scss'
import { CarInfo } from 'modules/elements/Cards/Car/CarCard'
import CarBlock from 'modules/templates/CarBlock'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, ProgressBar, Row } from 'react-bootstrap'
import { Button } from '../buttons/Button'
import Form from '../forms/Form'
import Textarea from '../textarea/textarea'

export const TabCars = () => {
  const [cars, setCars] = useState<ICarModel[]>([])
  const router = useRouter()

  useEffect(() => {
    getCarsForCarpark(router.query.id).then((res: any) => {
      setCars(res.data)
    })
  }, [])

  // console.log(cars)

  return (
    <>
      {cars.length ? (
        <CarBlock
          title={'Автомобили автопарка'}
          Cars={cars}
          getData={getCars}
        />
      ) : (
        <>ПУСТО</>
      )}
    </>
  )
}

export const TabProfile = () => {
  const [carpark, setCarpark] = useState<ICarparkModel>({})
  // const router = useSearchParams()
  // const { id } = router.query
  // useEffect(() => {
  //   getCarpark(id).then((res) => setCarpark(res.data))
  // }, [])

  return (
    <>
      <h2 className='carpark-profile__title title'>Профиль автопарка</h2>

      <h3 className={profile['carpark-profile__subtitle']}>
        Профиль автопарка
      </h3>
      <div className={profile['carpark-profile__about']}>
        <p dangerouslySetInnerHTML={useSanitize(carpark.description)}></p>
      </div>

      <Row>
        <Col xs={12} sm={4}>
          <h3 className={profile['carpark-profile__subtitle']}>
            Оценка товаров
          </h3>
          <div className={profile['carpark-profile__info']}>
            <div className={profile['carpark-profile__label']}>
              Средняя оценка автопарка
            </div>
            <div className={profile['carpark-profile__value']}>
              <span>{carpark.rait || 5}</span> из 5
            </div>
          </div>
          <div className={profile['carpark-profile__info']}>
            <div className={profile['carpark-profile__label']}>
              Количество оценок
            </div>
            <div className={profile['carpark-profile__value']}>
              <span>1 237</span>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={4}>
          <h3 className={profile['carpark-profile__subtitle']}>
            Количество заказов
          </h3>
          <div className={profile['carpark-profile__info']}>
            <div className={profile['carpark-profile__label']}>
              Количество заказов
            </div>
            <div className={profile['carpark-profile__value']}>
              <span>1 699</span>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export const TabReviews = () => {
  return (
    <>
      <Row>
        <Col xs={12} md={8} className='order-2 order-md-1'>
          <div className={reviews['carpark-reviews__item']}>
            <div className={reviews['carpark-reviews__top']}>
              <div className={reviews['carpark-reviews__info']}>
                <div className={reviews['carpark-reviews__photo']}>
                  <Image
                    src='/media/user.png'
                    width={100}
                    height={100}
                    alt=''
                  />
                </div>
                <div className={reviews['carpark-reviews__user-data']}>
                  <div className={reviews['carpark-reviews__username']}>
                    Курам Барам
                  </div>
                  <div className={reviews['carpark-reviews__position']}>
                    Водитель
                  </div>
                </div>
              </div>
              <div className={reviews['carpark-reviews__review-info']}>
                <time
                  className={reviews['carpark-reviews__date']}
                  dateTime='2022-04-22'
                >
                  22 Апреля 2022
                </time>
                <div className={reviews['carpark-reviews__rate']}>
                  {Array(5)
                    .fill(1, 0, 4)
                    .map((star, key) => (
                      <div key={key} className={reviews['icon']}>
                        <Star color={reviews['icon__item']} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={reviews['carpark-reviews__comment']}>
              <div className={reviews['carpark-reviews__text']}>
                <span>Автомобиль:</span>
                <p>Lada Granta AMG V8</p>
              </div>
              <div className={reviews['carpark-reviews__text']}>
                <span>Комментарий:</span>
                <p>
                  Я брать машина на сутки. Все класс. Парк хороший. Авто
                  хороший. Звонил хорошо. Машина не ломаться, руль крутиться,
                  коляса поворачиваться. Потом яма была, в яму упала, я жив.
                  Права теперь нет, автопарк сказал, что машина должен вернуть,
                  я машина вернуть в состоянии плохой. Но парк сказал, что
                  машина не плохой. Надо кредит брать, помогите кто нибудь лада
                  купить
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} className='order-1 order-md-2'>
          <div
            className={reviews_aside['carpark-reviews__aside reviews-aside']}
          >
            <div className={reviews_aside['reviews-aside__content']}>
              <div className={reviews_aside['reviews-aside__top']}>
                <div className={reviews_aside['reviews-aside__rate']}>
                  {Array(5)
                    .fill(1, 0, 4)
                    .map((star, key) => (
                      <div key={key} className={reviews_aside['icon']}>
                        <Star color={reviews_aside['icon__item']} />
                      </div>
                    ))}
                </div>
                <div className={reviews_aside['reviews-aside__overall-rate']}>
                  <span>4.95</span> / 5
                </div>
              </div>
              <div className={reviews_aside['reviews-aside__body']}>
                {Array(5)
                  .fill(1, 0, 4)
                  .map((star, key) => (
                    <div
                      key={key}
                      className={reviews_aside['reviews-aside__progress-item']}
                    >
                      <div
                        className={
                          reviews_aside['reviews-aside__progress-label']
                        }
                      >
                        5 звезд
                      </div>
                      <ProgressBar
                        className={reviews_aside['progress']}
                        min={0}
                        max={100}
                        now={80}
                      />
                      <div
                        className={
                          reviews_aside['reviews-aside__progress-value']
                        }
                      >
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
  )
}

export const TabFeedback = () => {
  return (
    <div className={`${feedback['carpark-contact']} carpark-tab__body auth`}>
      <h1 className={`cars__title title`}>Задайте ваш вопрос автопарку</h1>
      <Form>
        <div className={feedback['form__item']}>
          <div className={feedback['form__label']}>Ваш вопрос</div>
          <div className={form['form__wrap']}>
            <Textarea />
          </div>
        </div>

        <div className={form['form__bottom']}>
          <div className={feedback['form__btn-group']}>
            <div className={feedback['form__btn-wrap']}>
              <Button type={'submit'}>Отправить</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export const TabCar = ({ car }: { car: ICarModel }) => {
  return (
    <>
      <CarInfo Car={car} />
    </>
  )
}
