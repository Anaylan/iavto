import { ICarparkBlock, ICarparkModel } from 'app/models';
import { HeartFill, Star } from 'assets/icon/icons';
import React, { useEffect, useState } from 'react';

import { URL_IMG } from 'app/config';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { IRegionState } from 'app/redux/reducers/regionReducer';

import Image from 'next/image';
import { useSelector } from 'react-redux';
import { EmptyComponent } from 'modules/elements';
import { requestAddToFavor, requestDelFromFavor } from 'api/User';

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
          <h2 className={`carparks__title title`}>{title}</h2>
          {Carparks.length ? (
            <Row
              className={
                large ? `carparks__body gx-0 gy-0` : `carparks__body gx-0 gy-0`
              }>
              {Carparks.map((tender: ICarparkModel, key: number) => (
                <Col key={key} {...columns}>
                  <CarparkItem carPark={tender} lazy={large} />
                </Col>
              ))}
            </Row>
          ) : (
            <EmptyComponent />
          )}
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
  const [active, setActive] = useState<boolean>(carPark.favorite);

  const toFavor = (id: number) => {
    if (active) {
      requestDelFromFavor(id).then(({ data }) => {
        if (data) {
          setActive(false);
        }
      });
    } else {
      requestAddToFavor(id).then(({ data }) => {
        if (data) {
          setActive(true);
        }
      });
    }
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
                src={URL_IMG + '/img/cid/' + carPark.cid + '/' + carPark.img}
                alt=''
              />
            ) : (
              <Image
                priority={true}
                fill
                sizes={'100%'}
                src={URL_IMG + '/img/images.png'}
                alt=''
              />
            )}
          </Link>
          <div
            className={
              active
                ? `carparks__hover carparks-hover carparks-hover_visible`
                : `carparks__hover carparks-hover`
            }>
            {!active ? (
              <div
                onClick={() => {
                  toFavor(Number(carPark.cid));
                }}
                className={'carparks-hover__item'}>
                <div>???????????????? ??</div>
                <span className={'icon icon-heart'}>
                  <HeartFill />
                </span>
              </div>
            ) : (
              <div
                className={'carparks-hover__item carparks-hover-act'}
                onClick={() => {
                  toFavor(Number(carPark.cid));
                }}>
                <span className={'icon icon-heart'}>
                  <HeartFill />
                </span>
              </div>
            )}
          </div>
        </div>
        <Link
          className={'carparks__item-title'}
          href={`/carpark/${carPark.cid}`}>
          <p className='text-truncate'>{carPark.company_name}</p>
        </Link>
        <div className={'carparks__content'}>
          <Link className={'carparks__value'} href={`/carpark/${carPark.cid}`}>
            <span>{carPark.count_product}</span>??????????????????????
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
