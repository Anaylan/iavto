import React, { ReactNode } from 'react'
import table from 'assets/sass/components/tables/table.module.scss'

export const THead = ({ row }: { row: string[] }) => {
  return (
    <>
      <thead>
        <tr>
          {row.map((item, key) => (
            <th key={key}>
              <div className={`${table['table__head']}`}>{item}</div>
            </th>
          ))}
        </tr>
      </thead>
    </>
  )
}

export const TCell = ({
  children,
  className
}: {
  children: ReactNode
  className?: string | undefined
}) => {
  return (
    <>
      <td className={className ? className : ''}>
        <div className={`${table['table__item']}`}>{children}</div>
      </td>
    </>
  )
}
