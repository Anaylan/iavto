import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Container } from 'react-bootstrap';
export default function Vacancies() {
  return (
    <>
      <Head>
        <title>Вакансии | {TITLE}</title>
      </Head>
      <section>
        <Container>
          <h1 className='title'>В данный момент вакансий нет</h1>
        </Container>
      </section>
    </>
  );
}
