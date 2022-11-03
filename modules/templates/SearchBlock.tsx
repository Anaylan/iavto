import React, { useState } from 'react'
import styles from 'assets/sass/components/blocks/search.module.scss'
import { Col, Row } from 'react-bootstrap'
// import {Button} from "modules/UI";

// Эконом
// Комфорт
// Комфорт +
// Минивэн
// Premier
// Élite
// Cruise
// Business

declare type advClass = string | undefined

interface SelectOption {
  children: React.ReactNode
  advClass: string | null
  data: any
}

interface SelectProps {
  children: React.ReactNode
  defaultValue: string | undefined
}

export const SearchBlock = () => {
  return (
    <>
      <div className={styles['search__body']}>
        <h2 className={`${styles['search__title']} title`}>
          Поиск автомобилей
        </h2>
        <h3 className={`${styles['search__subtitle']} subtitle`}>
          Более 10 800 проверенных автомобилей
        </h3>
        <form className={`${styles['search__form']} search-form`} method=''>
          <Row
            className={`${styles['search-form__tariffs']} ${styles['search-tariffs']} align-items-center`}
          >
            <SearchCheckbox title={'Эконом'} />
            <SearchCheckbox title={'Комфорт'} />
            <SearchCheckbox title={'Комфорт +'} />
            <SearchCheckbox title={'Минивэн'} />
            <SearchCheckbox title={'Premier'} />
            <SearchCheckbox title={'Élite'} />
            <SearchCheckbox title={'Cruise'} />
            <SearchCheckbox title={'Business'} />
          </Row>
          <Row className='d-none'>
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
          </Row>
          <h3 className={`${styles['search__title-sm']} title-sm`}>
            Дополнительные фильтры
          </h3>
          <Row
            className={`search-form__additional ${styles['search-additional']} align-items-center`}
          >
            <SearchItem
              columns={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <SearchSelect defaultValue={''}>
                <SearchSelectOption
                  data={{
                    value: '',
                    disabled: true
                  }}
                  advClass={styles['option-hide']}
                >
                  Статус
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '1'
                  }}
                >
                  Статус 1
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '2'
                  }}
                >
                  Статус 2
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '3'
                  }}
                >
                  Статус 3
                </SearchSelectOption>
              </SearchSelect>
            </SearchItem>
            <SearchItem
              columns={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <SearchSelect defaultValue={''}>
                <SearchSelectOption
                  data={{
                    value: '',
                    disabled: true
                  }}
                  advClass={styles['option-hide']}
                >
                  Статус
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '1'
                  }}
                >
                  Статус 1
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '2'
                  }}
                >
                  Статус 2
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '3'
                  }}
                >
                  Статус 3
                </SearchSelectOption>
              </SearchSelect>
            </SearchItem>
            <SearchItem
              columns={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <SearchSelect defaultValue={' '}>
                <SearchSelectOption
                  data={{
                    value: ' ',
                    disabled: true
                  }}
                  advClass={styles['option-hide']}
                >
                  Марка
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '1'
                  }}
                >
                  Марка 1
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '2'
                  }}
                >
                  Марка 2
                </SearchSelectOption>
                <SearchSelectOption
                  advClass={''}
                  data={{
                    value: '3'
                  }}
                >
                  Марка 3
                </SearchSelectOption>
              </SearchSelect>
            </SearchItem>
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
              {/* <Button className={`${styles["search-form__btn"]} btn-main btn-main-trp`}>Убрать фильтры</Button> */}
              {/* <Button className={`${styles["search-form__btn"]} btn-main`}>Поиск по параметрам</Button> */}
            </Col>
          </Row>
        </form>
      </div>
    </>
  )
}

export const SearchCheckbox = ({ title }: { title: string }) => {
  const [active, setActive] = useState(false)

  return (
    <>
      <Col md={4} xs={6} className={`${styles['search-tariffs__item']}`}>
        <div
          onClick={() => {
            setActive(!active)
          }}
          className={
            active
              ? `${styles['checkbox-active']} ${styles['search-tariffs__checkbox']}`
              : styles['search-tariffs__checkbox']
          }
        >
          <input
            type='checkbox'
            name='searchTarif5'
            className={'form-check-input'}
          />
          <span>{title}</span>
        </div>
      </Col>
    </>
  )
}

export const SearchItem = ({
  children,
  columns
}: {
  children: React.ReactNode
  columns: any
}) => {
  return (
    <>
      <Col
        {...columns}
        className={`${styles['search-additional__item']} ${styles['select-wrap']}`}
      >
        {children}
      </Col>
    </>
  )
}

export const PriceFromTo = () => {
  return (
    <>
      <div
        className={`${styles['search-additional__price']} d-flex align-items-center`}
      >
        <p>Цена:</p>
        <input
          className={styles['search-form__input']}
          type='number'
          placeholder='От'
        />
        <span></span>
        <input
          className={styles['search-form__input']}
          type='number'
          placeholder='До'
        />
      </div>
    </>
  )
}

export const SearchSelect: React.FC<SelectProps> = ({
  children,
  defaultValue
}) => {
  return (
    <>
      <select
        defaultValue={defaultValue}
        className={` ${styles['search-additional__select']} 
                                        ${styles['search-form__input']} align-items-center`}
      >
        {children}
      </select>
    </>
  )
}

export const SearchSelectOption: React.FC<SelectOption> = ({
  children,
  advClass,
  data
}) => {
  return (
    <>
      <option
        className={`${styles['search-form__input']} ${styles['option-hide']} ${advClass}`}
        {...data}
      >
        {children}
      </option>
    </>
  )
}
