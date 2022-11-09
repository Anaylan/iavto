import { Html, Head, Main, NextScript } from 'next/document'
// import { useSanitize } from 'app/hooks'

// document.body.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
//   console.log('open your context menu')
//   return false
// })

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
