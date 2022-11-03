import { useEffect } from 'react'

import styles from 'assets/sass/components/header.module.scss'
import {
  MenuList,
  MenuListBottom,
  MenuListBottomItem,
  MenuListItem
} from 'modules/UI'
import { RegionSearch } from 'modules/UI/Header/bottom'
import { SearchInput } from 'modules/UI/inputs/SearchInput'
import Link from 'next/link'
import { forwardRef } from 'react'

export const HeaderMenu = forwardRef((props, ref) => {
  console.log(props)

  return (
    <>
      <div
        className={`${styles['menu']} header__menu ${styles['header-fixed']}`}
      >
        <div className='container'>
          <div className={styles['menu__wrapper']}>
            <div className={styles['menu__main']}>
              <div className={styles['menu__body']}>
                <SearchInput placeholder={'Поиск...'} />
                <RegionSearch />
                <MenuList>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                  <MenuListItem href={'#'}>123</MenuListItem>
                </MenuList>
              </div>
            </div>
            <MenuListBottom>
              <MenuListBottomItem>
                <Link href={'#'}>123</Link>
              </MenuListBottomItem>
              <MenuListBottomItem>
                <Link href={'#'}>123</Link>
              </MenuListBottomItem>
              <MenuListBottomItem>
                <Link href={'#'}>123</Link>
              </MenuListBottomItem>
              <MenuListBottomItem>
                <Link href={'#'}>123</Link>
              </MenuListBottomItem>
              <MenuListBottomItem>
                <Link href={'#'}>123</Link>
              </MenuListBottomItem>
            </MenuListBottom>
            <div className='footer'>
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
  )
})
