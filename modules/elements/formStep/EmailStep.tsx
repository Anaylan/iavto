import { requestCode } from 'api/User';
import { useFormik } from 'formik';
import { FormInputWithoutLabel } from 'modules/UI';
import React from 'react';
import Link from 'next/link';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Button } from 'modules/UI';

const EmailStepSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения'),
});

export const EmailStep = ({
  step,
  setStep,
  setToken,
}: {
  step: number;
  setStep: CallableFunction;
  setToken: CallableFunction;
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: EmailStepSchema,
    onSubmit: (values) => {
      requestCode(values.email)
        .then(({ data }) => {
          if (data.token) {
            setStep(step + 1);
            setToken(data.token);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <>
      <Form className='auth__form form' onSubmit={formik.handleSubmit}>
        <div className={'form__body'}>
          {formik.errors.email && formik.touched.email ? (
            <div className={'form__notification'}>{formik.errors.email}</div>
          ) : null}
          <div className='form__label-auth'>Введите почту</div>
          <FormInputWithoutLabel
            name={'email'}
            placeholder='Почта'
            type={'email'}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className={'form_' + '_bottom'}>
            <div className={'form__link-wrap'}>
              <Link href={'/auth/signin'}>Обратно к авторизации</Link>
            </div>
            <div className={'form__btn-group'}>
              <div className={'form__btn-wrap'}>
                <Button type={'submit'}>Далее</Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
