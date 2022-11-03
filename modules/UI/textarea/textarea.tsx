import React from 'react'
import form from 'assets/sass/components/form.module.scss'

export const Textarea = ({ children, ...props }) => {
  return (
    <>
      <textarea className={form['form__input']} {...props}>
        {children}
      </textarea>
    </>
  )
}

export default Textarea
