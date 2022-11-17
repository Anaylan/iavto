import { FC } from 'react'

export const FormLabel: FC<any> = ({ classname, children, ...props }) => {
  return (
    <div className={'form__label'} {...props}>
      {children}
    </div>
  )
}
