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
            <span>ЯАВТО.РФ</span> — Первый маркетплейс на рынке, который
            связывает между собой водителей такси и таксопарки
          </h1>
          <h2 className='about__subtitle'>Что мы предлагаем нашим клиентам?</h2>
          <div className='about__text'>
            <p>
              ЯАВТО.РФ - это качественный сервис для таксопарков и водителей
              такси, где водители найдут подходящее авто под их критерии, а
              таксопарки смогут сдавать в аренду автомобиль для работы в такси.
            </p>
          </div>
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
                        ЯАВТО.РФ полноценный маркетплейс для аренды автомобилей
                        в такси
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          На нашем сайте вы найдете доступные таксопарки в вашем
                          городе и сможете арендовать автомобиль прямо в
                          приложении. Все автопарки и автомобили проверены, а
                          оплата защищена, поэтому вам можно не волноваться при
                          выборе таксопарка.
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
                        Возможность выбирать лучшее предложение на рынке
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Каждый водитель сможет выбрать для себя самый лучший
                          вариант для аренды. У нас есть удобный фильтр
                          автомобилей, который позволит вам найти подходящий
                          вариант. Отзывы и оценки смогут оставить водители,
                          которые арендовали автомобиль. На основе этих отзывов,
                          будет составляться общий рейтинг.
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
                        Автомобиль проверяется на соответствие безопасности
                        работы в такси
                      </h3>
                      <div className='about-list__text'>
                        <p>
                          Благодаря системе проверки, площадка отбирает,
                          пригодна ли машина для перевозки пассажиров. Это
                          существенно помогает водителям выбирать условия аренды
                          автомобиля.
                        </p>
                        <p>
                          ЯАВТО.РФ проверит и присвоит рейтинг водителю, так что
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
                          Данная функция позволит автопаркам автоматически
                          формировать документы. Водителям не придется ждать
                          много времени при получении. Все документы уже будут
                          готовы при выдаче автомобиля. Останется только
                          подписать документ и получить ключи от машины.
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
