import { ReactNode, FC } from 'react';
import Link from 'next/link';

interface IMenuList {
  children: ReactNode;
}

interface IMenuListItem {
  href: string;
  children: ReactNode;
  onClick?: ((e: any) => void) | undefined;
}

export const MenuList: FC<IMenuList> = ({ children }) => {
  return (
    <>
      <ul className={'menu__list'}>{children}</ul>
    </>
  );
};

export const MenuListItem: FC<IMenuListItem> = ({
  href,
  children,
  onClick,
}) => {
  return (
    <>
      <li>
        <Link onClick={onClick} href={href}>
          {children}
        </Link>
      </li>
    </>
  );
};
