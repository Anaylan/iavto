import bonuses from 'assets/sass/components/car/car__bonuses.module.scss'
import { Check } from 'assets/icon/icons'
import details from 'assets/sass/components/car/car__details.module.scss'

export const CarCardBonuses = () => {
  return (
    <div className={bonuses['car__bonuses']}>
      <div className={details['cars-item__label']}>Бонусы</div>
      <ul className={bonuses['car__bonuses-list']}>
        <li>
          <div className={bonuses['icon']}>
            <Check color={bonuses['icon__item']} />
          </div>
          <div className={bonuses['car__bonuses-item']}>
            <div className={bonuses['car__bonuses-title']}>Ремонт</div>
            <div className={bonuses['car__bonuses-subtitle']}>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className={bonuses['icon']}>
            <Check color={bonuses['icon__item']} />
          </div>
          <div className={bonuses['car__bonuses-item']}>
            <div className={bonuses['car__bonuses-title']}>Техобслуживание</div>
            <div className={bonuses['car__bonuses-subtitle']}>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className={bonuses['icon']}>
            <Check color={bonuses['icon__item']} />
          </div>
          <div className={bonuses['car__bonuses-item']}>
            <div className={bonuses['car__bonuses-title']}>
              Сезонная замена шин
            </div>
            <div className={bonuses['car__bonuses-subtitle']}>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
        <li>
          <div className={bonuses['icon']}>
            <Check color={bonuses['icon__item']} />
          </div>
          <div className={bonuses['car__bonuses-item']}>
            <div className={bonuses['car__bonuses-title']}>
              Служба поддержки
            </div>
            <div className={bonuses['car__bonuses-subtitle']}>
              Парк оплачивает ремонт кузова, если он требуется не по вине
              водителя
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
