import { requestNewPassword } from 'api/User';
import { useFormik } from 'formik';
import { FormInputWithoutLabel } from 'modules/UI';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Button } from 'modules/UI';

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Пароль обязателен для заполнения')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
});

export const PasswordStep = ({
  step,
  setStep,
  code,
  token,
}: {
  step: number;
  setStep: CallableFunction;
  token: string;
  code: string;
}) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: passwordSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      requestNewPassword(token, code, values.password)
        .then(({ data }) => {
          if (data) {
            console.log(data);
            router.push('/auth/signin');
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setStep(step + 1);
    },
  });
  return (
    <>
      <Form className='auth__form form' onSubmit={formik.handleSubmit}>
        <div className={'form__body'}>
          {formik.errors.password && formik.touched.password ? (
            <div className={'form__notification'}>{formik.errors.password}</div>
          ) : null}
          <div className='form__label-auth'>Введите новый пароль</div>
          <FormInputWithoutLabel
            placeholder='Пароль'
            id='password'
            type={'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className={'form_' + '_bottom'}>
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
