import { Col, Container, Row } from 'react-bootstrap';
import { Carpark, Driver } from 'assets/icon/icons';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as ref from 'app/redux/reducers/referralReducer';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { requestAddToStats } from 'api/Refferal';
import { useEffect } from 'react';

export default function Invite() {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickRef = () => {
    dispatch(ref.actions.addToReferral(router.query.ref_code));
    router.push('/');
  };

  useEffect(() => {
    requestAddToStats(router.query.ref_code);
  }, []);

  return (
    <>
      <Head>
        <title>Реферал | {TITLE}</title>
      </Head>
      <section className={'referal'}>
        <Container>
          <Row className='gx-5 align-items-center justify-content-center flex-column flex-md-row'>
            <Col xs={12} md={6}>
              <button className={`referal__btn`} onClick={clickRef}>
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={'icon'}>
                    <Driver />
                    {/* <use xlink:href='#driver'></use> */}
                  </div>
                  <span>Я водитель</span>
                </span>
              </button>
            </Col>
            <Col xs={12} md={6}>
              <a
                className={`referal__btn referal__btn_carpark`}
                href={`http://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/main?ref_code=${router.query.ref_code}`}
                rel='noreferrer'>
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={'icon'}>
                    <Carpark />
                    {/* <use xlink:href='#carpark'></use> */}
                  </div>
                  <span>Я автопарк</span>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
