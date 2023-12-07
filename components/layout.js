import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../public/img/hayteklogo.png'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>HAYTEK</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.jpg' />
      </Head>
      <div className='navbar navbar-dark d-flex justify-content-center py-3 mb-4 shadow-sm bg-white rounded gap-5'>
        <Image
          src={Logo}
          alt='Haytek Logo'
          width={300}
          className='d-none d-sm-block'
        />
        <Link
          prefetch={false}
          href='/'
          className='navbar-brand d-flex align-items-center'
          style={{ color: '#551B5E', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Ana Sayfa
        </Link>
        <Link
          prefetch={false}
          href='/calendar'
          className='navbar-brand d-flex align-items-center'
          style={{ color: '#551B5E', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Zaman Takvimi
        </Link>
      </div>
      <div>{children}</div>
    </>
  )
}
