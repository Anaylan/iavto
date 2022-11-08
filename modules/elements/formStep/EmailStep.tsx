import { reset } from 'api/AuthCrud'
import { useFormik } from 'formik'
import { FormInputWithoutLabel } from 'modules/UI'
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup'

const EmailStepSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения')
})

export const EmailStep = ({
  step,
  setStep
}: {
  step: number
  setStep: CallableFunction
}) => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    enableReinitialize: true,
    validationSchema: EmailStepSchema,
    onSubmit: (values) => {
      reset(values.email)
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
        <h1 className='title'>Восстановление пароля 1</h1>
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <FormInputWithoutLabel
          name={'email'}
          required
          placeholder='Почта'
          type={'email'}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Button type='submit'>Далее</Button>
      </Form>
    </>
  )
}
