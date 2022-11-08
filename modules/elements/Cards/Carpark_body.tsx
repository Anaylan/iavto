import React from 'react'
import info from 'assets/sass/components/carpark/carpark-intro__info.module.scss'

interface ICarparkInfo {
  rating: number
  orders: number | null
}

export const CarparkInfo: React.FC<ICarparkInfo> = ({ rating, orders }) => {
  return (
    <>
      <div className={info['carpark-intro__info']}>
        <div className={info['carpark-intro__info-item']}>
          <div className={info['carpark-intro__info-body']}>
            <div className={info['carpark-intro__info-value']}>
              <div>
                <span>{rating}</span>/ 5
              </div>
            </div>
            <div className={info['carpark-intro__info-subtitle']}>
              рейтинг автопарка
            </div>
          </div>
        </div>
        <div className={info['carpark-intro__info-item']}>
          <div className={info['carpark-intro__info-body']}>
            <div className={info['carpark-intro__info-value']}>
              <div>{orders}</div>
            </div>
            <div className={info['carpark-intro__info-subtitle']}>
              выполненных заказов
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
