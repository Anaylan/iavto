import Head from 'next/head'
import { TITLE } from 'app/config'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Страница не найдена | {TITLE}</title>
      </Head>
      <h1>Страница не найдена</h1>
    </>
  )
}
