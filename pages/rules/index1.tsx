import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Container } from 'react-bootstrap';

// сделано перенаправление на in_dev

export default function Rules() {
  return (
    <>
      <Head>
        <title>Правила | {TITLE}</title>
      </Head>
      <Container></Container>
    </>
  );
}
