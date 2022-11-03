import React, { FC } from 'react'
import form from 'assets/sass/components/form.module.scss'
import { IForm } from 'app/models'

const Form: FC<IForm> = ({ children, ...props }) => {
  return (
    <>
      <form className={`auth__form form`} {...props}>
        <div className={form['form__body']}>{children}</div>
      </form>
    </>
  )
}

const Body = () => {
  return <></>
}

export default Form
