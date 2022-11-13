import { Check } from 'assets/icon/icons';

export const CarCardBonuses = () => {
  return (
    <div className='car__bonuses'>
      <div className='cars-item__label'>Бонусы</div>
      <ul className='car__bonuses-list'>
        <li>
          <div className='icon'>
            <Check />
          </div>
          <div className='car__bonuses-item'>
            <div className='car__bonuses-title'>Ремонт</div>
            <div className='car__bonuses-subtitle'>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className='icon'>
            <Check />
          </div>
          <div className='car__bonuses-item'>
            <div className='car__bonuses-title'>Техобслуживание</div>
            <div className='car__bonuses-subtitle'>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className='icon'>
            <Check />
          </div>
          <div className='car__bonuses-item'>
            <div className='car__bonuses-title'>Сезонная замена шин</div>
            <div className='car__bonuses-subtitle'>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className='icon'>
            <Check />
          </div>
          <div className='car__bonuses-item'>
            <div className='car__bonuses-title'>Служба поддержки</div>
            <div className='car__bonuses-subtitle'>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
