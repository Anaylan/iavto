import React, { ReactNode } from 'react'
import { Row } from 'react-bootstrap'
import styles from 'assets/sass/components/blocks/search.module.scss'

export const SearchMainRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`${styles['search-additional']}`}>{children}</Row>
    </>
  )
}

export const SearchAdditonalRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`${styles['search-additional']}`}>{children}</Row>
    </>
  )
}

export const SearchTarrifsRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`${styles['search-tariffs']} align-items-center`}>
        {children}
      </Row>
    </>
  )
}
