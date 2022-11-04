import { ICarModel } from 'app/models'
import { Eye, Heart, Prohibit } from 'assets/icon/icons'
import car from 'assets/sass/components/car/car.module.scss'
import { Button } from 'modules/UI/buttons/Button'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

interface ICarCardHeader {}

export const CarCardHeader: React.FC<ICarModel> = ({ mark, model, year }) => {
  return (
    <>
      <div className={car['car__top']}>
        <Row className={car['car__row']}>
          <Col
            xs={12}
            md={5}
            className={`${car['car__col']} d-flex align-items-center justify-content-between`}
          >
            <h2 className={`${car['car__title']} title`}>
              {mark} {model} <span>{year}</span>
            </h2>
            <div className={`${car['car__top-views']} d-md-none`}>
              <div className={car['icon']}>
                <Eye color={car['icon__item']} />
              </div>
              <span>1589</span>
            </div>
          </Col>
          <Col xs={12} md={7} className={car['car__col']}>
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
              <div className={car['car__top-actions']}>
                <Button className={car['btn-main']} type={'button'}>
                  <div className='d-flex align-items-center'>
                    <div className={'icon'}>
                      <Heart color={'icon__item'} />
                    </div>
                    <span>В избранное</span>
                  </div>
                </Button>
                <Button
                  type={'button'}
                  className={`${car['btn-main']} btn-main-white`}
                >
                  <div className='d-flex align-items-center'>
                    <div className={'icon'}>
                      <Prohibit color={'icon__item'} />
                    </div>
                    <span>Пожаловаться</span>
                  </div>
                </Button>
              </div>
              <div className={`${car['car__top-views']} d-none d-md-flex`}>
                <div className={car['icon']}>
                  <Eye color={car['icon__item']} />
                </div>
                <span>1589</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
