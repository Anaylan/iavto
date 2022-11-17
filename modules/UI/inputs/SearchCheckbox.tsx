import { Col } from 'react-bootstrap'
import { FC, InputHTMLAttributes, useState } from 'react'

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  props?: InputHTMLAttributes<HTMLInputElement>
}

export const SearchCheckbox: FC<ICheckbox> = ({ title, ...props }) => {
  return (
    <>
      <Col as={'label'} md={4} xs={6} className={`search-tariffs__item`}>
        <div className={`checkbox-active search-tariffs__checkbox`}>
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
