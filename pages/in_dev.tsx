import { Container } from 'react-bootstrap';
import Head from 'next/head';
import Link from 'next/link';
import { TITLE } from 'app/config';

export default function inDev() {
  return (
    <>
      <Head>
        <title>Страница находится в разработке | {TITLE}</title>
      </Head>
      <Container>
        <section>
          <h2 className='d-flex justify-content-center title'>
            Страница находится в разработке
          </h2>
          <p className='d-flex justify-content-center title'>
            <Link href='/'>Вернуться на главную</Link>
          </p>
        </section>
      </Container>
    </>
  );
}
