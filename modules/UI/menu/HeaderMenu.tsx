import { getNotReadAmount } from 'api/Chat';
import { getFavoriteCount, getSuccessOrdersCount } from 'api/User';
import { ILink, UserDataModel } from 'app/models';
import { HeaderBottomLinks } from 'modules/templates';
import {
  MenuList,
  MenuListBottom,
  MenuListBottomItem,
  MenuListItem,
} from 'modules/UI';
import { RegionSearch } from 'modules/UI/Header/bottom';
import { SearchInput } from 'modules/UI/inputs/SearchInput';
import Link from 'next/link';
import { Bullet } from '../bullet/Bullet';

const Links = [
  {
    href: '/orders',
    children: <>Заказы<Bullet getData={getSuccessOrdersCount} /></>,
  },
  {
    href: '/favorites',
    children: <>Избранное<Bullet getData={getFavoriteCount}/></>,
  },
  {
    href: '/chat',
    children: <>Сообщения<Bullet getData={getNotReadAmount}/></>,
  },
  {
    href: '/carpark',
    children: 'Автопарки',
  },
  {
    href: '/car',
    children: 'Автомобили',
  },
  {
    href: '/rules',
    children: 'Правила',
  },
  {
    href: '/pay',
    children: 'Оплата',
  },
  {
    href: '/partners',
    children: 'Партнеры',
  },
  {
    href: '/feedback',
    children: 'Обратная связь',
  },
];

export const HeaderMenu = ({
  user,
  onClick,
}: {
  user: UserDataModel | null | undefined;
  onClick: ((e: any) => void) | undefined;
}) => {
  return (
    <>
      <div className={`menu header__menu header-fixed`}>
        <div className='container'>
          <div className={'menu__wrapper'}>
            <div className={'menu__main'}>
              <div className={'menu__body'}>
                <SearchInput placeholder={'Поиск...'} />
                <RegionSearch className={`header-region collapse show`} />
                <MenuList>
                  {user ? (
                    <MenuListItem onClick={onClick} href={'/profile'}>
                      {user.firstname}
                    </MenuListItem>
                  ) : (
                    <MenuListItem onClick={onClick} href={'/auth/signin'}>
                      Войти
                    </MenuListItem>
                  )}
                  {Links.map((link, key) => (
                    <MenuListItem onClick={onClick} key={key} href={link.href}>
                      {link.children}
                    </MenuListItem>
                  ))}
                </MenuList>
              </div>
              <MenuListBottom>
                <MenuListBottomItem onClick={onClick}>
                  {HeaderBottomLinks.map((link, key) => (
                    <Link href={link.href} key={key}>
                      {link.title}
                    </Link>
                  ))}
                </MenuListBottomItem>
              </MenuListBottom>
            </div>
            <div className='menu__footer'>
              <div className='text-dark'>
                <span className='text-muted fw-bold'>
                  2022© ЯАВТО.РФ Все права защищены
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
