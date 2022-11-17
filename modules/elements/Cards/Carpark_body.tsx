import React from 'react'

interface ICarparkInfo {
  rating: number
  orders: number | null
}

export const CarparkInfo: React.FC<ICarparkInfo> = ({ rating, orders }) => {
  return (
    <>
      <div className={'carpark-intro__info'}>
        <div className={'carpark-intro__info-item'}>
          <div className={'carpark-intro__info-body'}>
            <div className={'carpark-intro__info-value'}>
              <div>
                <span>{rating}</span>/ 5
              </div>
            </div>
            <div className={'carpark-intro__info-subtitle'}>
              рейтинг автопарка
            </div>
          </div>
        </div>
        <div className={'carpark-intro__info-item'}>
          <div className={'carpark-intro__info-body'}>
            <div className={'carpark-intro__info-value'}>
              <div>{orders}</div>
            </div>
            <div className={'carpark-intro__info-subtitle'}>
              выполненных заказов
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
