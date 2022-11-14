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
                  <TenderPark carPark={tender} lazy={large} />
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

export function TenderPark({
  carPark,
  lazy,
}: {
  carPark: ICarparkModel;
  lazy: boolean;
}) {
  return (
    <>
      <div className={'carparks__item'}>
        <Link className={'carparks__img'} href={`/carpark/${carPark.cid}`}>
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

          <div className={`carparks__hover carparks-hover`}>
            <div
              onClick={() => {
                console.log('Добавить избранное');
              }}
              className={'carparks-hover__item'}>
              <div>Добавить в</div>
              <span className={'icon'}>
                <Heart />
              </span>
            </div>
          </div>
        </Link>
        <Link
          className={'carparks__item-title'}
          href={`/carpark/${carPark.cid}`}>
          <span>{carPark.company_name}</span>
        </Link>
        <div className={'carparks__content'}>
          <Link className={'carparks__value'} href='#'>
            <span>{carPark.count_product}</span>автомобилей
          </Link>
          <Link className={'carparks__rating'} href='#'>
            <span>{carPark.rait ? carPark.rait : '5.0'}</span>
            <div className={'icon'}>
              <Star />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
