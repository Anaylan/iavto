import Head from 'next/head';
import { TITLE, URL_IMG } from 'app/config';
import { useState, useEffect } from 'react';
import { getPartners } from 'api/Partners';
import { IPartnerModel } from 'app/models/partners/Partner';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { sanitize } from 'libs/functions';
import { EmptyComponent } from 'modules/elements';

export default function CarServices() {
  const [partners, setPartners] = useState<IPartnerModel[]>([]);
  const partnerType = 3

  useEffect(() => {
    getPartners(partnerType).then(({ data }) => {
      setPartners(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Автомойки | {TITLE}</title>
      </Head>
      <section className='partners'>
        <Container>
          <h1 className='title'>Автомойки</h1>
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