import React from 'react';
import { ICarModel } from 'app/models';

export const CarCardDetails: React.FC<ICarModel> = ({
  fuel_type,
  horse_power,
  transmission,
  mileage,
}) => {
  return (
    <div className='car__details'>
      <div className='cars-item__label'>Технические характеристики</div>
      <ul className='cars-item__charact'>
        <li>
          <div>КПП</div>
          <div>
            <span>{transmission}</span>
          </div>
        </li>
        <li>
          <div>Тип топлива</div>
          <div>
            <span>{fuel_type}</span>
          </div>
        </li>
        {/* Про марку уточнить 
        <li>
          <div>Марка топлива</div>
          <div>
            <span>АИ-95</span>
          </div>
        </li> */}
        <li>
          <div>Мощность</div>
          <div>
            <span>{horse_power}</span> л.с.
          </div>
        </li>
        {/* <li>
          <div>Привод</div>
          <div>
            <span>Передний</span>
          </div>
        </li>
        <li>
          <div>Тип кузова</div>
          <div>
            <span>Седан</span>
          </div>
        </li> */}
        <li>
          <div>Пробег</div>
          <div>
            <span>
              {String(mileage).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} км
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
