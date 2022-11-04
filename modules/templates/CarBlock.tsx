import { URL_IMG } from 'app/config'
import { ICarModel } from 'app/models'
import { Location } from 'assets/icon/icons'
import styles from 'assets/sass/components/card/car-list.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface ICarArray {
  title: string
  Cars: ICarModel[]
  getData: CallableFunction
}

const CarBlock: React.FC<ICarArray> = ({ Cars, getData, title }) => {
  // const [Car, setCar] = useState([]);
  // useEffect(() => {
  //     getData().then((res : AxiosResponse<ICarModel>) => {
  //         setCar(res.data);
  //     });
  //
  // }, [setCar])

  return (
    <>
      {
        <section className={'cars'}>
          <Container>
            <h1 className={`cars__title title`}>{title}</h1>

            <Row>
              {Cars.length? Cars.map((car, key: number) => (
                <GenerateCar key={key} car={car} />
              )) : <>Пусто</>}
            </Row>
          </Container>
        </section>
      }
    </>
  )
}
export default CarBlock

export function GenerateCar({ car }: { car: ICarModel }) {
  return (
    <>
      <Col xs={12} sm={6} lg={12} className={`${styles['cars__col']}`}>
        <div
          className={`cars__item ${styles['cars-item']} ${styles['cars-premium']}`}
        >
          <Row>
            <Col xs={12} lg={4} className={'d-flex'}>
              <Link
                className={`${styles['cars-item__img']}`}
                href={`/car/${car.id}`}
              >
                <Image
                  priority={false}
                  fill
                  sizes={'100%'}
                  src={URL_IMG + `/` + car.cid + `/` + car.img[0]}
                  alt={`${car.mark} ${car.model}`}
                />
              </Link>
            </Col>
            <Col xs={12} lg={4}>
              <Col className={`${styles['cars-item__main']}`}>
                <div className={`${styles['cars-item__main-body']}`}>
                  <Link
                    className={`${styles['cars-item__title']}`}
                    href={`/car/${car.id}`}
                  >
                    {car.mark} {car.model}
                    <span>{car.year}</span>
                  </Link>
                  <div className={`${styles['cars-item__subtitle']}`}>
                    Автопарк:<Link href={''}>{car.company_name}</Link>
                  </div>
                  <div className={`${styles['cars-item__region']}`}>
                    <div className={styles['icon']}>
                      <Location color={styles['icon__item']} />
                    </div>
                    <span>{car.city.name}</span>
                  </div>
                  <div className={styles['cars-item__label']}>
                    Характеристики
                  </div>
                  <ul className={styles['cars-item__charact']}>
                    <li>
                      <div>Топливо</div>
                      <div>
                        <span>{car.fuel_type}</span>
                      </div>
                    </li>
                    <li>
                      <div>Мощность</div>
                      <div>
                        <span>{car.horse_power}</span> л.с.
                      </div>
                    </li>
                    <li>
                      <div>Топливо</div>
                      <div>
                        <span>{car.fuel_type}</span>
                      </div>
                    </li>
                    <li>
                      <div>Топливо</div>
                      <div>
                        <span>{car.fuel_type}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Col>
            <Col xs={12} lg={4}>
              <div className={styles['cars-item__info']}>
                <div className={styles['cars-item__info-content']}>
                  <div className={`${styles['cars-item__info-body']}`}>
                    <div
                      className={`d-none d-lg-flex ${styles['cars-item__price']} `}
                    >
                      <span>{car.price}</span>
                      <div>руб / сут</div>
                    </div>
                    <ul className={styles['cars-item__list']}>
                      <li>Без залога</li>
                      <li>Без комиссии</li>
                      <li>Есть возможность долгой аренды</li>
                    </ul>
                  </div>
                  <div
                    className={
                      'd-flex align-items-center justify-content-between'
                    }
                  >
                    <div className={`d-lg-none ${styles['cars-item__price']} `}>
                      <span>{car.price}</span>
                      <div>руб / сут</div>
                    </div>
                    <Link
                      className={`${styles['cars-item__btn']} btn-main`}
                      href={`/car/${car.id}`}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  )
}
