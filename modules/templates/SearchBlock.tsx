import React, { FC, FormHTMLAttributes, ReactNode } from 'react'
import { Col, ColProps } from 'react-bootstrap'

interface ISearchBlock extends FormHTMLAttributes<HTMLFormElement> {
  title: string
  subtitle: string
  children: ReactNode
  props?: FormHTMLAttributes<HTMLFormElement>
}

export const SearchBlock: FC<ISearchBlock> = ({
  title,
  subtitle,
  children,
  ...props
}) => {
  return (
    <>
      <div className={'search__body'}>
        <h2 className={`search__title title`}>{title}</h2>
        <h3 className={`search__subtitle subtitle`}>{subtitle}</h3>
        <form {...props}>
          {children}
          {/* <Row className='d-none'>
            <Col md={5} lg={6} className='d-none d-md-block'></Col>
            <Col
              xs={12}
              md={7}
              lg={6}
              className={`${styles['search-additional__item']} d-flex align-items-center justify-content-end`}
            >
              <button
                className={`${styles['search-form__btn']} ${styles['btn-main']} ${styles['btn-main-trp']}`}
              >
                Убрать фильтры
              </button>
              <button
                className={`${styles['search-form__btn']} ${styles['btn-main']}`}
              >
                Поиск по параметрам
              </button>
            </Col>
          </Row> */}
          {/* 
         
            <Col
              xs={12}
              md={5}
              lg={6}
              className={`${styles['search-additional__item']} d-flex`}
            >
              <PriceFromTo />
            </Col>
            <Col
              xs={12}
              md={7}
              lg={6}
              className={`${styles['search-additional__item']} d-flex align-items-center justify-content-end`}
            >
              <Button
                className={`${styles['search-form__btn']} btn-main btn-main-trp`}
              >
                Убрать фильтры
              </Button>
              <Button className={`${styles['search-form__btn']} btn-main`}>
                Поиск по параметрам
              </Button>
            </Col>
          </Row> */}
        </form>
      </div>
    </>
  )
}

export const SearchItem = ({
  children,
  columns
}: {
  children: React.ReactNode
  columns?: ColProps
}) => {
  return (
    <>
      <Col
        {...columns}
        className={`search-additional__item d-flex select-wrap`}
      >
        {children}
      </Col>
    </>
  )
}

export const PriceFromTo = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={`search-additional__price d-flex align-items-center`}>
        <p>Цена:</p>
        {children}
      </div>
    </>
  )
}
