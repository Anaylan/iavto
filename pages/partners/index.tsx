import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { TITLE, URL_IMG } from 'app/config';
import { Col, Container, Row } from 'react-bootstrap';
import { EmptyComponent } from 'modules/elements';
import { getPartners } from 'api/Partners';
import Image from 'next/image';
import { IPartnerModel } from 'app/models/partners/Partner';
import { sanitize } from 'libs/functions';
// сделано перенаправление на in_dev

export default function Partners() {
  const [partners, setPartners] = useState<IPartnerModel[]>([]);
  useEffect(() => {
    getPartners().then(({ data }) => {
      setPartners(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Партнёры | {TITLE}</title>
      </Head>
      <section className='partners'>
        <Container>
          <h1 className='title'>Партнёры</h1>
          <Row className='partners__row'>
            {partners ? (
              <>
                {partners.length > 0 ? (
                  partners.map((partner, key) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={key}
                      className='partners__col'>
                      <a
                        className='partners__item'
                        href={partner.url}
                        rel='noreferrer'
                        target={'_blank'}>
                        <span className='partners__top'>
                          <span className='partners__img'>
                            <Image
                              src={
                                partner.img
                                  ? URL_IMG + '/img/partners/' + partner.img
                                  : '/media/carpark.png'
                              }
                              width={100}
                              height={100}
                              sizes='100%'
                              alt={partner.name}
                            />
                          </span>
                        </span>
                        <span className='partners__main'>
                          <span className='partners__title'>
                            {/* <span>Телеграм канал:</span> */}
                            <span
                            >
                              {partner.name}
                            </span>
                          </span>
                          <span
                            className='partners__desc'
                            dangerouslySetInnerHTML={sanitize(
                              partner.description,
                            )}
                          />
                        </span>
                        <span className='partners__bottom'>
                          <span
                            className='partners__link'
                          >
                            Перейти
                          </span>
                        </span>
                      </a>
                    </Col>
                  ))
                ) : (
                  <EmptyComponent />
                )}
              </>
            ) : (
              <EmptyComponent />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}
