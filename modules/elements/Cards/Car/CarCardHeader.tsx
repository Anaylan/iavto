import { ICarModel } from 'app/models';
import { Eye, Heart, Prohibit } from 'assets/icon/icons';
import { Button } from 'modules/UI/buttons/Button';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { requestAddToFavor, requestDelFromFavor } from 'api/User';

export const CarCardHeader: React.FC<ICarModel> = ({
  mark,
  model,
  year,
  id,
  viewed,
  favorite,
}) => {
  const [active, setActive] = useState<boolean>(favorite || false);
  const toFavor = (id: number) => {
    console.log(id);
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
      <div className='car__top'>
        <Row className='car__row'>
          <Col
            xs={12}
            md={5}
            className='car__col d-flex align-items-center justify-content-between'>
            <h2 className='car__title title'>
              {mark} {model} <span>{year}</span>
            </h2>
            <div className='car__top-views d-md-none'>
              <div className={'icon'}>
                <Eye />
              </div>
              <span>{viewed}</span>
            </div>
          </Col>
          <Col xs={12} md={7} className='car__col'>
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
              <div className='car__top-actions'>
                <Button
                  onClick={() => {
                    toFavor(Number(id));
                  }}
                  className='btn-main'
                  type={'button'}>
                  {!active ? (
                    <div
                      onClick={() => {
                        toFavor(Number(id));
                      }}
                      className='d-flex align-items-center'>
                      <div className={'icon'}>
                        <Heart />
                      </div>
                      <span>В избранное</span>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        toFavor(Number(id));
                      }}
                      className='d-flex align-items-center'>
                      <div className={'icon active'}>
                        <Heart />
                      </div>
                      <span>В избранном</span>
                    </div>
                  )}
                </Button>
                <Button type={'button'} className='btn-main btn-main-white'>
                  <div className='d-flex align-items-center'>
                    <div className={'icon'}>
                      <Prohibit />
                    </div>
                    <span>Пожаловаться</span>
                  </div>
                </Button>
              </div>
              <div className={`car__top-views d-none d-md-flex`}>
                <div className={'icon'}>
                  <Eye />
                </div>
                <span>{viewed}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
