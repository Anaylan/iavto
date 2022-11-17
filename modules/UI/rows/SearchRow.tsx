import React, { ReactNode } from 'react'
import { Row } from 'react-bootstrap'

export const SearchMainRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`search-additional`}>{children}</Row>
    </>
  )
}

export const SearchAdditonalRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`search-additional`}>{children}</Row>
    </>
  )
}

export const SearchTarrifsRow = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Row className={`search-tariffs align-items-center`}>{children}</Row>
    </>
  )
}
