import { FC } from 'react';
import Image from 'next/image';
import { Crown } from 'assets/icon/icons';

interface ICard {
  title: string | null;
  sold: number | null;
  src: string | null;
  tarif: number | null;
  alt: string | null;
}

export const CarparkCard: FC<ICard> = ({ title, sold, src, tarif, alt }) => {
  return (
    <>
      <div className={`carpark-main carpark-intro__main`}>
        <div className={'d-flex'}>
          <div className={'carpark-main__img'}>
            <Image
              src={src ? src : ''}
              width={50}
              sizes={'100%'}
              height={50}
              alt={alt ? alt : ''}
            />
          </div>
          <div className={'carpark-main__info'}>
            {tarif && tarif > 0 ? (
              <div className={'carpark-main__status'}>
                <div className={'icon'}>
                  <Crown />
                </div>
                <span>Премиум автопарк</span>
              </div>
            ) : null}

            <h1 className={'carpark-main__title'}>{title}</h1>
            <div className={'carpark-main__subtitle'}>
              <span>{sold}</span> автомобиля
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
