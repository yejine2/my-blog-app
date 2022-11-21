import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'YEJIN'
export const siteTitle = 'Next.js Blog'

export default function Layout({ children, home }) {
  // 초기값에 함수 -> Lazy하게 동작 -> localStorage를 읽어온 후에 동작할 수 있다.
  // undefined가 아닐때만 localStorage에 접근
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'light'
        ? 'light'
        : 'dark'
      : // undefined인 상태라면 light
        'light'
  )

  useEffect(() => {
    if (theme === 'light') {
      document.querySelector('body').classList.remove('dark')
    } else {
      document.querySelector('body').classList.add('dark')
    }
  }, [theme])

  const handleClick = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark')
      setTheme('dart')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return (
    <div className="bg-blue-50 dark:bg-black text-gray-800 dark:text-gray-200 h-screen">
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <button className="w-12 px-2" onClick={handleClick}>
          {theme === 'light' ? (
            <img src="/light-mode.svg" alt="light" />
          ) : (
            <img src="/dark-mode.svg" alt="dark" />
          )}
        </button>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt=""
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}
      </div>
    </div>
  )
}
