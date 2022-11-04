import { IFormInput } from 'app/models'
import form from 'assets/sass/components/form.module.scss'
import { FC } from 'react'
import MaskedInput from 'react-text-mask'


export const FormInputWithLabel: FC<IFormInput> = ({
  title,
  className,
  ...props
}) => {
  return (
    <>
      <div className={form['form__item']}>
        <div className={form['form__label']}>{title}</div>
        <div className={form['form__wrap']}>
          <input
            className={`${form['form__input']}  ${className}`}
            {...props}
          />
        </div>
      </div>
    </>
  )
}

export const FormInputWithMask: FC<IFormInput> = ({
  title,
  className,
  mask,
  ...props
}) => {
  // const phoneMask = createNumberMask({
  //   ...defaultMaskOptions,
  //   ...mask,
  // })
  return (
    <>
      <div className={form['form__item']}>
        <div className={form['form__label']}>{title}</div>
        <div className={form['form__wrap']}>
          <MaskedInput
            mask={mask}
            className={`${form['form__input']} ${className}`}
            {...props}
          />
        </div>
      </div>
    </>
  )
}

export const FormInputWithoutLabel: FC<IFormInput> = ({
  title,
  className,
  ...props
}) => {
  return (
    <>
      <div className={form['form__wrap']}>
        <input className={`${form['form__input']} ${className}`} {...props} />
      </div>
    </>
  )
}

export const FormInputWithMaskNotLabel: FC<IFormInput> = ({
  title,
  mask,
  className,
  ...props
}) => {
  return (
    <>
      <div className={form['form__wrap']}>
        <MaskedInput
          mask={mask}
          className={`${form['form__input']} ${className || ''}`}
          {...props}
        />
      </div>
    </>
  )
}
