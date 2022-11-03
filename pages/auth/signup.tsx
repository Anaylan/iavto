import { register } from 'api/AuthCrud'
import { UserModel } from 'app/models'
import auth_styles from 'assets/sass/components/auth.module.scss'
import form from 'assets/sass/components/form.module.scss'
import { useFormik } from 'formik'
import { FormInputWithLabel, FormInputWithMask } from 'modules/UI'
import Form from 'modules/UI/forms/Form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { TITLE } from 'app/config'
import * as header from 'app/redux/reducers/authReducer'

const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[1-9]/,
  /[1-9]/,
  /[1-9]/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/
]

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Имя: Минимум 3 символа')
    .max(50, 'Имя: Максимум 50 символов')
    .required('Имя обязательно для заполнения'),
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения'),
  lastname: Yup.string()
    .min(3, 'Фамилия: Minimum 3 symbols')
    .max(50, 'Фамилия: Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Пароль: Minimum 8 symbols')
    .required('Пароль обязателен для заполнения'),
  number: Yup.string()
    .min(10, 'Номер телефона: Минимум 5 символа')
    .max(50, 'Номер телефона: Maximum 50 symbols')
    .required('Номер телефона обязателен для заполнения'),
})

export const Register: React.FC<UserModel> = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const router = useRouter()

  const user = useSelector(({ header }) => header.title)

  if (user) {
    router.push('/')
  }

  const formik = useFormik({
    initialValues: {
      lastname: 'Иванов',
      firstname: 'Иван',
      email: 'ivan@mail.ru',
      password: 'ivan123',
      phone: '+7(000)000-00-00'
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setLoading(true)
      register(
        values.email,
        values.password,
        values.firstname,
        values.lastname,
        values.phone
      )
        .then(({ data }) => {
          setLoading(false)
          dispatch(header.actions.register(data.token))
          if (data.token) {
            router.replace('/')
          }
        })
        .catch((err) => {
          setLoading(false)
        })
    }
  })

  return (
    <>
      <Head>
        <title>Регистрация | {TITLE}</title>
      </Head>
      <section className='auth'>
        <div className='container'>
          <div className={auth_styles['auth__body']}>
            <h1 className={auth_styles['auth__title']}>Регистрация</h1>

            <Form onSubmit={formik.handleSubmit}>
              <div className={form['form__body']}>
                <FormInputWithLabel
                  title={'Пароль'}
                  name={'password'}
                  type={'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={
                    '' +
                    (formik.touched.password && !formik.errors.password
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />

                <FormInputWithLabel
                  title={'E-Mail'}
                  name={'email'}
                  type={'email'}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={
                    '' +
                    (formik.touched.email && !formik.errors.email
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />

                <FormInputWithLabel
                  title={'Имя'}
                  name={'firstname'}
                  type={'firstname'}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  className={
                    '' +
                    (formik.touched.firstname && !formik.errors.firstname
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />

                <FormInputWithLabel
                  title={'Фамилия'}
                  name={'lastname'}
                  type={'lastname'}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  className={
                    '' +
                    (formik.touched.lastname && !formik.errors.lastname
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
                {/* <Field  name={'123'} /> */}
                <FormInputWithMask
                  title={'Номер телефона'}
                  name={'phone'}
                  type={'phone'}
                  mask={phoneNumberMask}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.touched.phone && !formik.errors.phone
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
              </div>
              <div className={form['form__bottom']}>
                <div className={form['form__btn-group']}>
                  <div className={form['form__btn-wrap']}>
                    <button
                      type={'submit'}
                      className={`${form['btn-main']} ${form['btn-main-trp']}`}
                      disabled={
                        formik.isSubmitting ||
                        !formik.isValid ||
                        !formik.values.acceptTerms
                      }
                    >
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </div>
            </Form>
            <div className={'mt-2'}>
              {formik.touched.lastname && formik.errors.lastname && (
                <div className={form['form__notification']}>
                  {formik.errors.lastname}
                </div>
              )}
              {formik.touched.firstname && formik.errors.firstname && (
                <div className={form['form__notification']}>
                  {formik.errors.firstname}
                </div>
              )}
              {formik.touched.email && formik.errors.email && (
                <div className={form['form__notification']}>
                  {formik.errors.email}
                </div>
              )}
              {formik.touched.password && formik.errors.password && (
                <div className={form['form__notification']}>
                  {formik.errors.password}
                </div>
              )}
              {formik.touched.phone && formik.errors.phone && (
                <div className={form['form__notification']}>
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
