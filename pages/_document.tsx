import { Html, Head, Main, NextScript } from 'next/document'
import { useSanitize } from 'app/hooks'

export default function Document() {
  return (
    <Html lang='ru'>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
