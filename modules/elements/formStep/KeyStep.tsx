import { reset } from 'api/User'
import { Field, useFormik } from 'formik'
import { FormInputWithoutLabel } from 'modules/UI'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

export const KeyStep = ({
  step,
  setStep
}: {
  step: number
  setStep: CallableFunction
}) => {
  const formik = useFormik({
    initialValues: {
      key: '12312'
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      reset(values.key)
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
        <h1 className='title'>Восстановление пароля 2</h1>
        {formik.errors.key && formik.touched.key ? (
          <div>{formik.errors.key}</div>
        ) : null}
        {/* <Field /> */}
        <FormInputWithoutLabel
          placeholder='Ключ..'
          id='key'
          type={'text'}
          onChange={formik.handleChange}
          value={formik.values.key}
        />
        <Button type='submit'>Далее</Button>
      </Form>
    </>
  )
}
