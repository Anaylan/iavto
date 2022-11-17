import { useSanitize } from 'app/hooks'
import { ICarModel } from 'app/models'
import { CarCardBonuses } from 'modules/elements/Cards/Car/CarCardBonuses'
import { CarCardDetails } from 'modules/elements/Cards/Car/CarCardDetails'
import { CarCardHeader } from 'modules/elements/Cards/Car/CarCardHeader'
import { CarCardInfo } from 'modules/elements/Cards/Car/CarCardInfo'
import { CarCardSwiper } from 'modules/elements/Cards/Car/CarCardSwiper'
import { CarCardVerify } from 'modules/elements/Cards/Car/CarCardVerify'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

interface ICarInfo {
  Car: ICarModel
}

export const CarInfo: React.FC<ICarInfo> = ({ Car }) => {
  if (typeof Car.description !== 'string') {
    Car.description = ''
  }
  return (
    <>
      <CarCardHeader mark={Car.mark} model={Car.model} year={Car.year} />
      <div className='car__body'>
        <Row className='car__row'>
          <Col md={7} xs={12} className='car__col order-1 order-md-2'>
            <CarCardSwiper cid={Car.cid} images={Car.img!} />
            <CarCardBonuses />
          </Col>

          <Col md={5} xs={12} className='car__col order-2 order-md-1'>
            <CarCardInfo price={Car.price} company_name={Car.company_name} />
            <CarCardDetails
              fuel_type={Car.fuel_type}
              horse_power={Car.horse_power}
            />
            <CarCardVerify />

            <div className='car__details'>
              <div className='cars-item__label'>Описание автомобиля</div>
              <div className='car__details-about'>
                <p dangerouslySetInnerHTML={useSanitize(Car.description)} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
