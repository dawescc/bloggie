import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta name="apple-mobile-web-app-capable" content='yes'></meta>
      <Head />
      <body className='bg-white dark:bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
