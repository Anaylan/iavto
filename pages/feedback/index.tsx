import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';

export default function Feedback() {
  return (
    <>
      <Head>
        <title>Обратная связь | {TITLE}</title>
      </Head>
      <div>Обратная связь</div>
    </>
  );
}
