import { FC } from 'react'
import main from 'assets/sass/components/carpark/carpark-main.module.scss'
import Image from 'next/image'
import { Crown } from 'assets/icon/icons'

interface ICard {
  title: string
  sold: number
  src: string
  tarif: number
  alt: string
}

export const CarparkCard: FC<ICard> = ({ title, sold, src, tarif, alt }) => {
  return (
    <>
      <div className={`${main['carpark-main']} carpark-intro__main`}>
        <div className={'d-flex'}>
          <div className={main['carpark-main__img']}>
            <Image src={src} width={50} sizes={'100%'} height={50} alt={alt} />
          </div>
          <div className={'carpark-main__info'}>
            {tarif > 0 ? (
              <div className={main['carpark-main__status']}>
                <div className={main['icon']}>
                  <Crown color={main['icon__item']} />
                </div>
                <span>Премиум автопарк</span>
              </div>
            ) : (
              <></>
            )}

            <h1 className={main['carpark-main__title']}>{title}</h1>
            <div className={main['carpark-main__subtitle']}>
              <span>{sold}</span> автомобиля
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
