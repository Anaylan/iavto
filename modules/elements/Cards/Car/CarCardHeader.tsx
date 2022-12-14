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
              <span>{mark} {model}</span>
              <span>{year}</span>
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
                  type={'button'}
                  style={{ opacity: '1' }}
                  className={active ? `btn-main btn-fav` : `btn-main`}>
                  {!active ? (
                    <div className='d-flex align-items-center'>
                      <div className={'icon'}>
                        <Heart />
                      </div>
                      <span>?? ??????????????????</span>
                    </div>
                  ) : (
                    <div className='d-flex align-items-center'>
                      <div className={'icon'}>
                        <Heart />
                      </div>
                      <span>?? ??????????????????</span>
                    </div>
                  )}
                </Button>
                {/* <Button
                  type={'button'}
                  className='btn-main btn-main-white'
                  style={{ opacity: '1' }}>
                  <div className='d-flex align-items-center'>
                    <div className={'icon'}>
                      <Prohibit />
                    </div>
                    <span>????????????????????????</span>
                  </div>
                </Button> */}
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
