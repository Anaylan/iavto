import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Container } from 'react-bootstrap';

// сделано перенаправление на in_dev

export default function Feedback() {
  return (
    <>
      <Head>
        <title>Обратная связь | {TITLE}</title>
      </Head>
      <Container>
        <section>
          <h1 className='title'>Форма обратной связи</h1>
          <p>Вы можете задать свой вопрос в форме обратной связи</p>
          <p>
            Наша поддержка ответит вам на него в ближайшее время. Ответ придет
            на почту.
          </p>
          {/* <FormVerification user={}></FormVerification> */}
        </section>
      </Container>
    </>
  );
}
