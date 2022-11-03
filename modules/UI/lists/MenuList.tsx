import { ReactNode, FC } from 'react'
import styles from './MenuList.module.scss'
import Link from 'next/link'

interface IMenuList {
  children: ReactNode
}

interface IMenuListItem {
  href: string
  children: ReactNode
}

export const MenuList: FC<IMenuList> = ({ children }) => {
  return (
    <>
      <ul className={styles['menu__list']}>{children}</ul>
    </>
  )
}

export const MenuListItem: FC<IMenuListItem> = ({ href, children }) => {
  return (
    <>
      <li>
        <Link href={href}>{children}</Link>
      </li>
    </>
  )
}
