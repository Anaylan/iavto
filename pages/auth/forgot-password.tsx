import { reset } from 'api/AuthCrud';
import { useFormik } from 'formik';
import { Button, FormInputWithoutLabel } from 'modules/UI';
import Form from 'modules/UI/forms/Form';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
const forgotPasswordSchema = Yup.object().shape({ 
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения'), 
})

export const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector(({ header }: {header: any}) => header.title)

  if (user) {
    router.push('/')
  }
  
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      setLoading(true)
      reset(values.email)
        .then(({ data }) => {
          console.log(data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  })

  return <Fragment>
    <Form onSubmit={formik.handleSubmit}>
      <h1 className='title'>Восстановление пароля</h1>
      {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
      <FormInputWithoutLabel name={'email'}
                  required
                  placeholder='Почта'
                  type={'email'}
                  onChange={formik.handleChange}
                  value={formik.values.email} />
      <Button type='submit'>Отправить</Button>
    </Form>
  </Fragment>
}

export default ForgotPassword
