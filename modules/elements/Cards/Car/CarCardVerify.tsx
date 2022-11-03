import details from 'assets/sass/components/car/car__details.module.scss'

export const CarCardVerify = () => {
  return (
    <div className={details['car__details']}>
      <div className={details['cars-item__label']}>Отчет о проверке по VIN</div>
      <time className={details['car__details-date']} dateTime='2022-07-01'>
        Обновлен{' '}
        <div>
          1<span>июля</span>
        </div>
        <span>2022</span>
      </time>
      <ul className={details['car__details-list']}>
        <li>Характеристики совпадают с ПТС</li>
        <li>Данные о розыске не найдены</li>
        <li>Данные о ДТП не найдены</li>
      </ul>
    </div>
  )
}
