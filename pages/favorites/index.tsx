import { getUserFavor } from 'api/User';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { IFavoritesModel } from 'app/models/favorite/Favorites';
import { CarItem } from 'modules/templates/CarBlock';
import { CarparkItem } from 'modules/templates/CarParkBlock';

export default function Favorites() {
  const [favorites, setFavorites] = useState<IFavoritesModel | null>(null);

  useEffect(() => {
    getUserFavor().then(({ data }) => {
      setFavorites(data);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Избранное | {TITLE}</title>
      </Head>
      <Container>
        <div className={'mb-5'}>
          <h1 className='title'>Автопарки</h1>
          <Row>
            {favorites &&
              favorites.company.map((company, key: number) => (
                <Col key={key} md={3} xs={12}>
                  <CarparkItem lazy={false} carPark={company} />
                </Col>
              ))}
          </Row>
        </div>
        <div className={'mb-5'}>
          <h1 className='title'>Автомобили</h1>
          {favorites &&
            favorites.car.map((car, key: number) => (
              <CarItem car={car} key={key} />
            ))}
        </div>
      </Container>
    </>
  );
}
