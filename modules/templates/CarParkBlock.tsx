import { ICarparkBlock, ICarparkModel } from 'app/models';
import { Heart, Star } from 'assets/icon/icons';
import React, { useEffect, useState } from 'react';

import { URL_IMG } from 'app/config';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { IRegionState } from 'app/redux/reducers/regionReducer';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { EmptyComponent } from 'modules/elements';
import { requestAddToFavor } from 'api/User';

const CarParkBlock: React.FC<ICarparkBlock> = ({
  getData,
  columns,
  title,
  large = false,
}) => {
  const location: string | undefined = useSelector(
    ({ region }: { region: IRegionState }) => region.name,
  );

  const [Carparks, setCarparks] = useState<ICarparkModel[]>([]);
  useEffect(() => {
    getData().then(({ data }: { data: ICarparkModel[] }) => {
      setCarparks(data);
    });
  }, [setCarparks, getData, location]);

  return (
    <>
      <section className={large ? `carparks carparks-large` : `carparks`}>
        <Container>
          <h1 className={`carparks__title title`}>{title}</h1>
          <Row
            className={
              large
                ? `carparks__body gx-0 gy-0 carparks__large`
                : `carparks__body gx-0 gy-0 carparks`
            }>
            {Carparks.length ? (
              Carparks.map((tender: ICarparkModel, key: number) => (
                <Col key={key} {...columns}>
                  <CarparkItem carPark={tender} lazy={large} />
                </Col>
              ))
            ) : (
              <EmptyComponent />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};
export default CarParkBlock;

export function CarparkItem({
  carPark,
  lazy,
}: {
  carPark: ICarparkModel;
  lazy: boolean;
}) {
  const toFavor = (id: number) => {
    requestAddToFavor(id).then(({ data }) => {
      console.log(data);
    });
  };

  return (
    <>
      <div className={'carparks__item'}>
        <div className='carparks__main'>
          <Link href={`/carpark/${carPark.cid}`} className={'carparks__img'}>
            {carPark.img ? (
              <Image
                priority={lazy}
                loading={lazy ? 'eager' : 'lazy'}
                fill
                sizes={'100%'}
                src={URL_IMG + carPark.cid + '/' + carPark.img}
                alt=''
              />
            ) : (
              <Image
                priority={true}
                fill
                sizes={'100%'}
                src={URL_IMG + 'images.png'}
                alt=''
              />
            )}
          </Link>
          <div className={`carparks__hover carparks-hover`}>
            {/* {carPark.favor ? (
              <div
                onClick={() => {
                  toFavor(Number(carPark.cid));
                }}
                className={'carparks-hover__item'}>
                <div>Добавить в</div>
                <span className={'icon'}>
                  <Heart />
                </span>
              </div>
            ) : (
              <>
                <div class='carparks-hover__item carparks-hover-act'>
                  <span class='icon'>
                    <svg class='icon__item'>
                      <Heart />
                    </svg>
                  </span>
                </div>
              </>
            )} */}
            <div
              onClick={() => {
                toFavor(Number(carPark.cid));
              }}
              className={'carparks-hover__item'}>
              <div>Добавить в</div>
              <span className={'icon'}>
                <Heart />
              </span>
            </div>
          </div>
        </div>
        <Link
          className={'carparks__item-title'}
          href={`/carpark/${carPark.cid}`}>
          <span>{carPark.company_name}</span>
        </Link>
        <div className={'carparks__content'}>
          <Link className={'carparks__value'} href={`/carpark/${carPark.cid}`}>
            <span>{carPark.count_product}</span>автомобилей
          </Link>
          <Link className={'carparks__rating'} href={`/carpark/${carPark.cid}`}>
            <span>{carPark.rait ? Math.round(carPark.rait * 10) / 10 : 5}</span>
            <div className={'icon'}>
              <Star />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
