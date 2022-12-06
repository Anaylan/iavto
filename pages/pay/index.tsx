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
            <h2 className='subtitle fw-semibold mb-4'>
              Каждый человек, который желает арендовать автомобиль на ЯАВТО.РФ
              должен совершить ряд определенных действий!
            </h2>
            <ol className='list-group-numbered subtitle mb-2'>
              <li className='list-group-item mb-2'>
                &nbsp;Пройти полную верификацию учетной записи на ЯАВТО.РФ
              </li>
              <li className='list-group-item mb-2'>
                Найти подходящее авто на сайте ЯАВТО.РФ или в приложении
              </li>
              <li className='list-group-item'>
                Нажать кнопку &ldquo;Арендовать&ldquo;
              </li>
            </ol>
          </article>
          <article>
            <h3 className='subtitle fw-semibold mt-4 mb-3'>
              На какой срок я могу арендовать автомобиль на ЯАВТО.РФ?
            </h3>
            <p className='subtitle line-height-sm'>
              &nbsp;- Автомобиль, который вы арендуете на ЯАВТО.РФ будет оплачен
              на 1 сутки.
            </p>
            <p className='subtitle line-height-sm'>
              Все последующие дни - оплата снимается у вас в агрегаторе, но
              сумма за аренду автомобиля повыситься не может. Цена останется
              прежней, или может уменьшиться.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
