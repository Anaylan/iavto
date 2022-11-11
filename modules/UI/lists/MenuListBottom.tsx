import { FC, ReactNode } from 'react'
import styles from './MenuListBottom.module.scss'
interface IMenuListBottom {
  children: ReactNode
}

interface IMenuListBottomItem {
  children: ReactNode
  onClick: ((e: any) => void) | undefined
}

export const MenuListBottom: FC<IMenuListBottom> = ({ children }) => {
  return (
    <>
      <div className={styles['menu-bottom']}>
        <ul className={styles['menu-bottom__list']}>{children}</ul>
      </div>
    </>
  )
}

export const MenuListBottomItem: FC<IMenuListBottomItem> = ({
  children,
  onClick
}) => {
  return <li onClick={onClick}>{children}</li>
}
