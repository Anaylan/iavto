import { ICarModel } from 'app/models'
import { Location } from 'assets/icon/icons'
import info from 'assets/sass/components/car/car__item-info.module.scss'
import React from 'react'

//Swiper styles
import Link from 'next/link'

export const CarCardInfo: React.FC<ICarModel> = ({ price, company_name }) => {
  return (
    <div className={`${info['car__item-info']}`}>
      <div className={info['cars-item__info-content']}>
        <div className={info['cars-item__info-body']}>
          <div className='d-flex align-items-center justify-content-between'>
            <div className={info['cars-item__price']}>
              <span>{price}</span>
              <div>руб / сут</div>
            </div>
            <div className={info['cars-item__region']}>
              <div className={info['icon']}>
                <Location color={info['icon__item']} />
              </div>
              <span>Москва</span>
            </div>
          </div>
          <div className={info['cars-item__subtitle']}>
            Автопарк:<Link href='#'>{company_name}</Link>
          </div>
          <ul className={info['cars-item__list']}>
            <li>Без залога</li>
            <li>Без комиссии</li>
            <li>Есть возможность долгой аренды</li>
          </ul>
        </div>
        <Link className={`${info['cars-item__btn']} btn-main`} href='#'>
          Арендовать
        </Link>
      </div>
    </div>
  )
}
