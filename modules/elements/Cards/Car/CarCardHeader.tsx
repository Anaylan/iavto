import { ICarModel } from 'app/models';
import { Eye, Heart, Prohibit } from 'assets/icon/icons';
import { Button } from 'modules/UI/buttons/Button';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface ICarCardHeader {}

export const CarCardHeader: React.FC<ICarModel> = ({ mark, model, year }) => {
  return (
    <>
      <div className='car__top'>
        <Row className='car__row'>
          <Col
            xs={12}
            md={5}
            className='car__col d-flex align-items-center justify-content-between'
          >
            <h2 className='car__title title'>
              {mark} {model} <span>{year}</span>
            </h2>
            <div className='car__top-views d-md-none'>
              <div className={'icon'}>
                <Eye />
              </div>
              <span>1589</span>
            </div>
          </Col>
          <Col xs={12} md={7} className='car__col'>
            <div className='d-flex flex-wrap align-items-center justify-content-between'>
              <div className='car__top-actions'>
                <Button className='btn-main' type={'button'}>
                  <div className='d-flex align-items-center'>
                    <div className={'icon'}>
                      <Heart />
                    </div>
                    <span>В избранное</span>
                  </div>
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
                <span>1589</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
