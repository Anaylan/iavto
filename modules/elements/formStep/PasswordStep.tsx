import { reset } from 'api/AuthCrud'
import { useFormik } from 'formik'
import { FormInputWithoutLabel } from 'modules/UI'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const PasswordStep = ({
  step,
  setStep
}: {
  step: number
  setStep: CallableFunction
}) => {
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      reset(values.password)
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
      setStep(step + 1)
    }
  })
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <h1 className='title'>Восстановление пароля 3</h1>
        {formik.errors.password && formik.touched.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <FormInputWithoutLabel
          placeholder='Пароль..'
          id='password'
          type={'password'}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button type='submit'>Завершить</Button>
      </Form>
    </>
  )
}
