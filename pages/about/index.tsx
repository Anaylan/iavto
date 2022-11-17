import { Container, Row, Col } from 'react-bootstrap';
import { CheckFirst, Post, CarSecurity, Document } from 'assets/icon/icons';
import Head from 'next/head';
import { TITLE } from 'app/config';
export default function About() {
  return (
    <>
      <Head>
        <title>О нас | {TITLE}</title>
      </Head>
      <Container>
        <section className='about'>
          <h1 className='about__title title'>
            <span>ЯАВТО.РФ</span> — Первый Маркетплейс, где водители могут
            арендовать машину для работы в такси, а таксопарки — сдать в аренду
            автомобиль для работы в такси.
          </h1>
          <div className='about__body'>
            <ul className='about__list about-list'>
              <Row className='gx-5'>
                <Col xs={12} lg={6} className='d-flex'>
                  <li>
                    <div className='about-list__item'>
                      <h3>
                        <div className={'icon'}>
                          <CheckFirst />
                        </div>
                        Впервые подобный маркетплейс выходит на рынок такси
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Основные возможности маркетплейса аренды такси
                          ЯАВТО.РФ говорят о многом. Идея очень обширная и
                          показывает огромные перспективы в направлении аренды
                          машин для такси.
                        </p>
                      </div>
                    </div>
                  </li>
                </Col>
                <Col xs={12} lg={6} className='d-flex'>
                  <li>
                    <div className='about-list__item'>
                      <h3>
                        <div className={'icon'}>
                          <Post />
                        </div>
                        Возможность размещать объявления, показывая уникальность
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Возможность получать - выбирать &quot;качественного
                          водителя&quot;. Качественный водитель, прошедший опрос
                          на площадке, рассказав максимально развернутые ответы
                          и сбор информации не выявляет сложностей с данным
                          водителем.
                        </p>
                      </div>
                    </div>
                  </li>
                </Col>
                <Col xs={12} lg={6} className='d-flex'>
                  <li>
                    <div className='about-list__item'>
                      <h3>
                        <div className={'icon'}>
                          <CarSecurity />
                        </div>
                        Машина проверяется на соответствие безопасности работы в
                        такси
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Благодаря системе проверки машин площадка проверяет,
                          пригодна ли машина для перевозки пассажиров. Это
                          существенно помогает водителям выбирать условия аренды
                          автомобиля.
                        </p>
                        <p>
                          Размещают четкое и ясное описание, показывающие только
                          настоящие качества данного объявления. ЯАВТО.РФ
                          проверит и присвоит рейтинг водителю, так что
                          таксопарку будет проще принять решение. Благодаря
                          системе проверки водителя автопарк получает свежую
                          информацию о водителе. Вам останется только произвести
                          выбор и принять решение.
                        </p>
                      </div>
                    </div>
                  </li>
                </Col>
                <Col xs={12} lg={6} className='d-flex'>
                  <li>
                    <div className='about-list__item'>
                      <h3>
                        <div className={'icon'}>
                          <Document />
                        </div>
                        Система сформирует документы автоматически
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Основные возможности маркетплейса такси ЯАВТО.РФ
                          Говорят о многом, идея очень обширная, и показывает
                          огромные перспективы в направлении аренды машин для
                          такси.
                        </p>
                        <p>
                          Не нужно больше тратить время. Все просто. Зашли,
                          зарегистрировались, выбрали Автомобиль и через час
                          приступили получать прибыль. Вас будут ждать с
                          готовыми документами в офисе таксопарка.
                        </p>
                      </div>
                    </div>
                  </li>
                </Col>
              </Row>
            </ul>
          </div>
        </section>
      </Container>
    </>
  );
}
