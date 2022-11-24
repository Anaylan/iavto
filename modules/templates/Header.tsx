import { useRef, useState } from 'react';

import { LinkType } from 'app/models';
import { Chat, Heart, Package } from 'assets/icon/icons';
import { HeaderBody, HeaderBottom, HeaderTop } from 'modules/UI';

import { useDesktop, useScroll } from 'app/hooks';
import { Container } from 'react-bootstrap';

export const HeaderTopLinks: LinkType[] = [
  {
    href: '/favorites',
    children: <Heart />,
    title: 'Избранное',
  },
  {
    href: '/orders',
    children: <Package />,
    title: 'Заказы',
  },
  {
    href: '/chat',
    children: <Chat />,
    title: 'Сообщения',
  },
];

export const HeaderBodyLinks: LinkType[] = [
  { href: '/carpark', children: <></>, title: 'Автопарки' },
  { href: '/car', children: <></>, title: 'Автомобили' },
  // { href: '/rules', children: <></>, title: 'Правила' },
  { href: '/pay', children: <></>, title: 'Оплата' },
  { href: '/partners', children: <></>, title: 'Партнеры' },
  { href: '/feedback', children: <></>, title: 'Обратная связь' },
];

export const HeaderBottomLinks: LinkType[] = [
  {
    href: 'https://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/main/',
    children: <></>,
    title: 'Открыть автопарк',
  },
  // { href: '/', children: <></>, title: 'Для автопарков' },
  { href: '/referrals', children: <></>, title: 'Для реферальных партнеров' },
  { href: '/partners', children: <></>, title: 'Для партнеров' },
  { href: '/about', children: <></>, title: 'О нас' },
];

const Header: React.FC = () => {
  const [desktop, setDesktop] = useState<boolean>(true);
  const header = useRef<HTMLElement>(null);

  useDesktop(header, () => {
    if (window.innerWidth <= 992) {
      setDesktop(false);
    } else {
      if (document.body.classList.contains('lock')) {
        document.body.classList.remove('lock');
      }
      setDesktop(true);
    }
  });

  useScroll(header, () => {
    if (header && header.current) {
      if (window.innerWidth > 992) {
        if (window.pageYOffset > 700) {
          if (!header.current.classList.contains('header-fixed')) {
            header.current.classList.add('header-fixed');
          }
        } else {
          header.current.classList.remove('header-fixed');
        }
      } else {
        if (window.pageYOffset > 65) {
          if (!header.current.classList.contains('header-fixed')) {
            header.current.classList.add('header-fixed');
          }
        } else {
          header.current.classList.remove('header-fixed');
        }
      }
    }
  });

  return (
    <>
      <header className={`header`} id='header'>
        <Container fluid>
          <HeaderTop ref={header} desktop={desktop} links={HeaderTopLinks} />
          {desktop && (
            <>
              <HeaderBody links={HeaderBodyLinks} />
              <HeaderBottom links={HeaderBottomLinks} />
            </>
          )}
        </Container>
      </header>
    </>
  );
};

export default Header;
