import { ReactNode } from 'react'
import { Col, ColProps } from 'react-bootstrap'
import styles from 'assets/sass/components/blocks/search.module.scss'

export const SearchAdditionalCol = ({
  children,
  className,
  columns
}: {
  children: ReactNode
  className?: string | null
  columns?: ColProps
}) => {
  return (
    <>
      <Col
        {...columns}
        className={`${styles['search-additional__item']} ${className}`}
      >
        {children}
      </Col>
    </>
  )
}
