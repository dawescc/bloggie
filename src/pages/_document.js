import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta name="apple-mobile-web-app-capable" content='yes'></meta>
      <Head />
      <body className='bg-white dark:bg-black h-screen w-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
