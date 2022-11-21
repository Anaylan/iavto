import { Check } from 'assets/icon/icons';
import { Bonuse } from 'modules/UI';

const bonusesTitle = {
  repair: 'Ремонт',
  maintenance: 'Техобслуживание',
  tires: 'Сезонная замена шин',
  support: 'Служба поддержки',
  washing: 'Мойка',
  CASCO: 'Каско',
  phone: 'Смартфон',
  fuel: 'Топливо',
};

export const CarCardBonuses = ({
  bonuses,
}: {
  bonuses: { [key: string]: number };
}) => {
  return (
    <div className='car__bonuses'>
      {Object.values(bonuses).includes(1) && (
        <>
          <div className='cars-item__label'>Бонусы</div>
          <ul className='car__bonuses-list'>
            {Object.keys(bonuses).map(
              (bonuse, index) =>
                bonuses[bonuse] == 1 && (
                  <Bonuse
                    key={index}
                    title={bonusesTitle[bonuse as keyof typeof bonusesTitle]}>
                    {
                      'Парк оплачивает ремонт кузова, если он требуется не по вине водителя'
                    }
                  </Bonuse>
                ),
            )}
          </ul>
        </>
      )}
    </div>
  );
};
