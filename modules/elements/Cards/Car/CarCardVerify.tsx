import details from 'assets/sass/components/car/car__details.module.scss';

export const CarCardVerify = ({
  report,
}: {
  report: { [key: string]: number };
}) => {
  return (
    <div className={'car__details'}>
      <div className={'cars-item__label'}>Отчет о проверке по VIN</div>
      {/* <time className={'car__details-date'} dateTime='2022-07-01'>
        Обновлен{' '}
        <div>
          1<span>июля</span>
        </div>
        <span>2022</span>
      </time> */}
      <ul className={'car__details-list'}>
        <li>Характеристики совпадают с ПТС</li>
        {report.wanted == 0 ? (
          <li>Данные о розыске не найдены</li>
        ) : (
          <li>Найдены данные о розыске</li>
        )}
        {report.dtp == 0 ? (
          <li>Данные о ДТП не найдены</li>
        ) : (
          <li>Найдены данные о ДТП</li>
        )}
      </ul>
    </div>
  );
};
