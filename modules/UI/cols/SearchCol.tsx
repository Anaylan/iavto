import { ReactNode } from 'react'
import { Col, ColProps } from 'react-bootstrap'

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
      <Col {...columns} className={`search-additional__item ${className}`}>
        {children}
      </Col>
    </>
  )
}
