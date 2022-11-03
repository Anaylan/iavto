import { FC } from 'react'
import form from './FormLabel.module.scss'

export const FormLabel: FC<any> = ({ classname, children, ...props }) => {
  return (
    <div className={form['form__label']} {...props}>
      {children}
    </div>
  )
}
