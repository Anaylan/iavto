import React, { ReactNode, TextareaHTMLAttributes } from 'react'
import form from 'assets/sass/components/form.module.scss'

export const Textarea = ({
  children,
  className,
  ...props
}: {
  children?: ReactNode
  className?: string | undefined
  props?: TextareaHTMLAttributes<HTMLTextAreaElement>
}) => {
  return (
    <>
      <textarea className={`${form['form__input']} ${className}`} {...props}>
        {children}
      </textarea>
    </>
  )
}
