import React, { useState, useEffect } from 'react'
import { Heart, Star } from 'assets/icon/icons'
import { ICarparkBlock, ICarparkModel } from 'app/models'

import { Col, Container, Row } from 'react-bootstrap'
import { URL_IMG } from 'app/config'
import Link from 'next/link'

import main from 'assets/sass/components/card/carparks.module.scss'
import Image from 'next/image'

const CarParkBlock: React.FC<ICarparkBlock> = ({
  getData,
  columns,
  title,
  large = false
}) => {
  const [Carparks, setCarparks] = useState<ICarparkModel[]>([])
  useEffect(() => {
    getData().then((res: any) => {
      setCarparks(res.data)
    })
  }, [setCarparks])

  return (
    <>
      <section
        className={
          large
            ? `${main['carparks']} ${main['carparks-large']}`
            : `${main['carparks']}`
        }
      >
        <Container>
          <h1 className={`carparks__title title`}>{title}</h1>

          <Row
            className={
              large
                ? `${main['carparks__body']} gx-0 gy-0 carparks__large`
                : `${main['carparks__body']} gx-0 gy-0 carparks`
            }
          >
            {Carparks &&
              Carparks.map((tender: ICarparkModel, key: number) => (
                <Col key={key} {...columns}>
                  <TenderPark carPark={tender} lazy={large} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  )
}
export default CarParkBlock

export function TenderPark({
  carPark,
  lazy
}: {
  carPark: ICarparkModel
  lazy: boolean
}) {
  let sliced = carPark.company_name.slice(0, 17)
  if (sliced.length < carPark.company_name.length) {
    sliced += '...'
  }
  return (
    <>
      <div className={main['carparks__item']}>
        <Link
          className={main['carparks__img']}
          href={`/carpark/${carPark.cid}`}
        >
          {carPark.img ? (
            <Image
              priority={lazy}
              loading={lazy ? 'eager' : 'lazy'}
              fill
              sizes={'100%'}
              src={URL_IMG + carPark.cid + '/' + carPark.img}
              alt=''
            />
          ) : (
            <Image
              priority={true}
              fill
              sizes={'100%'}
              src={URL_IMG + 'images.png'}
              alt=''
            />
          )}

          <div className={`carparks__hover ${main['carparks-hover']}`}>
            <div className={main['carparks-hover__item']}>
              <div>Добавить в</div>
              <span className={main['icon']}>
                <Heart color={main['icon__item']} />
              </span>
            </div>
          </div>
        </Link>
        <Link
          className={main['carparks__item-title']}
          href={`/carpark/${carPark.cid}`}
        >
          <span>{sliced}</span>
        </Link>
        <div className={main['carparks__content']}>
          <Link className={main['carparks__value']} href='#'>
            <span>{carPark.count_product}</span>автомобилей
          </Link>
          <Link className={main['carparks__rating']} href='#'>
            <span>{carPark.rait ? carPark.rait : '5.0'}</span>
            <div className={main['icon']}>
              <Star color={main['icon__item']} />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
