import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Container } from 'react-bootstrap';

// сделано перенаправление на in_dev

export default function Pay() {
  return (
    <>
      <Head>
        <title>Оплата | {TITLE}</title>
      </Head>
      <section>
        <Container>
          <article>
            <h1 className='title'>Информация об оплате</h1>
            <p className='subtitle'>
              Каждый человек, который желает арендовать автомобиль на ЯАВТО.РФ
              должен совершить ряд определенный действий!
            </p>
            <ol className='list-group-numbered'>
              <li className='list-group-item'>
                Пройти полную верификацию учетной записи на ЯАВТО.РФ
              </li>
              <li className='list-group-item'>
                Найти подходящее авто на сайте ЯАВТО.РФ или в приложении
              </li>
              <li className='list-group-item'>
                Нажать кнопку &ldquo;Арендовать&ldquo;
              </li>
            </ol>
          </article>
          <article>
            <p className='subtitle'>
              На какой срок я могу арендовать автомобиль на ЯАВТО.РФ?
            </p>
            <p
              style={{
                whiteSpace: 'break-spaces',
                wordWrap: 'normal',
              }}>
              {' '}
              - Автомобиль, который вы арендуете на ЯАВТО.РФ будет оплачен на 1
              сутки.{'\n'}Все последущие дни - оплата снимается у вас в
              агрегаторе, но сумма за аренду автомобиля повыситься не может.
              Цена останется прежней, или может уменьшится.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
