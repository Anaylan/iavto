import React, { ReactNode, TextareaHTMLAttributes } from 'react'

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
      <textarea className={`form__input ${className}`} {...props}>
        {children}
      </textarea>
    </>
  )
}
