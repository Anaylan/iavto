import { Col } from 'react-bootstrap'
import styles from 'assets/sass/components/blocks/search.module.scss'
import { FC, InputHTMLAttributes, useState } from 'react'

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  props?: InputHTMLAttributes<HTMLInputElement>
}

export const SearchCheckbox: FC<ICheckbox> = ({ title, ...props }) => {
  return (
    <>
      <Col
        as={'label'}
        md={4}
        xs={6}
        className={`${styles['search-tariffs__item']}`}
      >
        <div
          className={`${styles['checkbox-active']} ${styles['search-tariffs__checkbox']}`}
        >
          <input
            type='checkbox'
            defaultChecked={false}
            className={'form-check-input'}
            {...props}
          />
          <span>{title}</span>
        </div>
      </Col>
    </>
  )
}
