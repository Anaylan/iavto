import { useState, useRef, useEffect } from 'react'

import { useWidth, useLoaded } from 'app/hooks'
import { LinkType } from 'app/models'
import { Chat, Heart, Package } from 'assets/icon/icons'
import styles from 'assets/sass/components/header.module.scss'
import header from 'assets/sass/components/header/top.module.scss'
import { HeaderBody, HeaderBottom, HeaderTop } from 'modules/UI'

import { Container } from 'react-bootstrap'

const HeaderTopLinks: LinkType[] = [
  {
    href: '/',
    children: <Heart color={header['icon__item']} />,
    title: 'Избранное'
  },
  {
    href: '/',
    children: <Package color={header['icon__item']} />,
    title: 'Заказы'
  },
  {
    href: '/chat',
    children: <Chat color={header['icon__item']} />,
    title: 'Сообщения'
  }
]

const HeaderBodyLinks: LinkType[] = [
  { href: '/carpark', children: <></>, title: 'Автопарки' },
  { href: '/car', children: <></>, title: 'Автомобили' },
  { href: '/rules', children: <></>, title: 'Правила' },
  { href: '/pay', children: <></>, title: 'Оплата' },
  { href: '/partners', children: <></>, title: 'Партнеры' },
  { href: '/feedback', children: <></>, title: 'Обратная связь' }
]

const HeaderBottomLinks: LinkType[] = [
  {
    href: 'https://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/login.php',
    children: <></>,
    title: 'Открыть автопарк'
  },
  { href: '/', children: <></>, title: 'Для автопарков' },
  { href: '/', children: <></>, title: 'Для реферальных партнеров' },
  { href: '/', children: <></>, title: 'Для партнеров' },
  { href: '/about', children: <></>, title: 'О нас' }
]

const Header: React.FC = () => {
  const [desktop, setDesktop] = useState<boolean>()
  const header: React.RefObject<any> = useRef()

  // useEffect(() => {
  //   if (window.innerWidth <= 992) {
  //     setDesktop(false)
  //   } else {
  //     setDesktop(true)
  //   }
  // }, [])

  useWidth(header, () => {
    if (window.innerWidth <= 992) {
      setDesktop(false)
    } else {
      setDesktop(true)
    }
  })

  useEffect(() => {
    if (window.innerWidth <= 992) {
      setDesktop(false)
    } else {
      setDesktop(true)
    }
    console.log(desktop)
  }, [])

  return (
    <>
      <header className={`${styles.header}`} id='header'>
        <Container fluid>
          <HeaderTop ref={header} desktop={desktop} links={HeaderTopLinks} />
          {desktop ? (
            <>
              <HeaderBody links={HeaderBodyLinks} />
              <HeaderBottom links={HeaderBottomLinks} />
            </>
          ) : (
            <></>
          )}
        </Container>
      </header>
    </>
  )
}

export default Header
