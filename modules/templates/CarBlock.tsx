import { URL_IMG } from 'app/config'
import { useFetch, useObserver } from 'app/hooks'
import { ICarModel } from 'app/models'
import { IRegionState } from 'app/redux/reducers/regionReducer'
import { Load, Location } from 'assets/icon/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { EmptyComponent } from 'modules/elements'

interface ICarArray {
  title: string
  getData: CallableFunction
}

const CarBlock: React.FC<ICarArray> = ({ getData, title }) => {
  const router = useRouter()
  const [cars, setCars] = useState<ICarModel[]>([])
  // const [isLoading, setLoading] = useState<boolean>(false)
  const location: string | undefined = useSelector(
    ({ region }: { region: IRegionState }) => region.name
  )
  let triggerElement: React.RefObject<any> = useRef()
  let totalCars = 10

  const [isLoading, Errors] = useFetch(() => {
    getData(0, totalCars, { ...router.query })
      .then(({ data }: { data: ICarModel[] }) => {
        setCars([...cars, ...data])
        console.log(data)
      })
      .catch((err: string) => {})
  })

  useObserver(triggerElement, true, isLoading, () => {
    getData(0, totalCars, { ...router.query })
      .then(({ data }: { data: ICarModel[] }) => {
        console.log(data)
        setCars([...cars, ...data])
        totalCars += 10
      })
      .catch((err: string) => {})
  })

  return (
    <>
      {
        <section className={'cars'}>
          <h1 className={`cars__title title`}>{title}</h1>
          <Row>
            {cars && cars.length ? (
              cars.map((car: ICarModel, key: number) => (
                <GenerateCar key={key} car={car} />
              ))
            ) : (
              <EmptyComponent />
            )}
          </Row>
          <div ref={triggerElement} />
          {isLoading && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Load />
              </div>
            </>
          )}
        </section>
      }
    </>
  )
}
export default CarBlock

export function GenerateCar({ car }: { car: ICarModel }) {
  return (
    <>
      <Col xs={12} sm={6} lg={12} className={`cars__col`}>
        <div className={`cars__item cars-item cars-premium`}>
          <Row>
            <Col xs={12} lg={4} className={'d-flex'}>
              <Link className={`cars-item__img`} href={`/car/${car.id}`}>
                <Image
                  priority={false}
                  fill
                  sizes={'100%'}
                  src={URL_IMG + `/` + car.cid + `/` + car.img![0]}
                  alt={`${car.mark} ${car.model}`}
                />
              </Link>
            </Col>
            <Col xs={12} lg={4}>
              <Col className={`cars-item__main`}>
                <div className={`cars-item__main-body`}>
                  <Link className={`cars-item__title`} href={`/car/${car.id}`}>
                    {car.mark} {car.model}
                    <span>{car.year}</span>
                  </Link>
                  <div className={`cars-item__subtitle`}>
                    Автопарк:<Link href={''}>{car.company_name}</Link>
                  </div>
                  <div className={`cars-item__region`}>
                    <div className={'icon'}>
                      <Location color={'icon__item'} />
                    </div>
                    <span>{car.city?.name}</span>
                  </div>
                  <div className={'cars-item__label'}>Характеристики</div>
                  <ul className={'cars-item__charact'}>
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
                  </ul>
                </div>
              </Col>
            </Col>
            <Col xs={12} lg={4}>
              <div className={'cars-item__info'}>
                <div className={'cars-item__info-content'}>
                  <div className={`cars-item__info-body`}>
                    <div className={`d-none d-lg-flex cars-item__price`}>
                      <span>{car.price}</span>
                      <div>руб / сут</div>
                    </div>
                    <ul className={'cars-item__list'}>
                      {/* Чего-то не хватает */}
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
                    <div className={`d-lg-none cars-item__price`}>
                      <span>{car.price}</span>
                      <div>руб / сут</div>
                    </div>
                    <Link
                      className={`cars-item__btn btn-main`}
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
