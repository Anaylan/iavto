import { ICarModel } from 'app/models';
import { Location } from 'assets/icon/icons';
import React from 'react';
import { setCarRent } from 'api/Rent';

//Swiper styles
import Link from 'next/link';

export const CarCardInfo: React.FC<ICarModel> = ({
  price,
  company_name,
  id,
}) => {
  return (
    <div className={`car__item-info`}>
      <div className={'cars-item__info-content'}>
        <div className={'cars-item__info-body'}>
          <div className='d-flex align-items-center justify-content-between'>
            <div className={'cars-item__price'}>
              <span>{price}</span>
              <div>руб / сут</div>
            </div>
            <div className={'cars-item__region'}>
              <div className={'icon'}>
                <Location />
              </div>
              <span>Москва</span>
            </div>
          </div>
          <div className={'cars-item__subtitle'}>
            Автопарк:<Link href='#'>{company_name}</Link>
          </div>
          <ul className={'cars-item__list'}>
            <li>Без залога</li>
            <li>Без комиссии</li>
            <li>Есть возможность долгой аренды</li>
          </ul>
        </div>
        <button
          className={`cars-item__btn btn-main`}
          onClick={async () => {
            await setCarRent(id!);
          }}>
          Арендовать
        </button>
      </div>
    </div>
  );
};
