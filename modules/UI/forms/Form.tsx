import { IForm } from 'app/models'
import form from 'assets/sass/components/form.module.scss'
import { FC } from 'react'

const Form: FC<IForm> = ({ children, ...props }) => {
  return (
    <>
      <form className={`auth__form form`} {...props}>
        <div className={form['form__body']}>{children}</div>
      </form>
    </>
  )
}

export default Form
