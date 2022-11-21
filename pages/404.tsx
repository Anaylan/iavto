import Head from 'next/head';
import { TITLE } from 'app/config';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Страница не найдена | {TITLE}</title>
      </Head>
      <section>
        <div className='d-flex align-items-center h-max justify-content-center'>
          <h1 className='display-1 fw-bold text-black'>
            404 - Страница не найдена
          </h1>
        </div>
      </section>
    </>
  );
}
