import { ICarModel } from 'app/models';
import { Location } from 'assets/icon/icons';
import React, { useState, useEffect } from 'react';
import { setCarRent } from 'api/Rent';
import { CarRentModal } from 'modules/elements';
import { useRouter } from 'next/router';

//Swiper styles
import Link from 'next/link';

export const CarCardInfo: React.FC<ICarModel> = ({
  price,
  company_name,
  id,
  cid,
  pledge,
  city
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);

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
              <span>{city?.name}</span>
            </div>
          </div>
          <div className={'cars-item__subtitle'}>
            Автопарк:<Link href={`/carpark/${cid}`}>{company_name}</Link>
          </div>
          <ul className={'cars-item__list'}>
            {pledge == 0 ? (
              <li>Без залога</li>
            ) : (
              <li>
                Залог <span>{pledge}</span> руб
              </li>
            )}
            {/* <li>Без комиссии</li>
            <li>Есть возможность долгой аренды</li> */}
          </ul>
        </div>
        <CarRentModal show={show} setShow={setShow} status={status} />
        <button
          className={`cars-item__btn btn-main`}
          onClick={async () => {
            const response = await setCarRent(id!);
            setStatus(response);
            setShow(true);
          }}>
          Арендовать
        </button>
      </div>
    </div>
  );
};
