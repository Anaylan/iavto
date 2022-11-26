import { requestPassword } from 'api/User';
import { Field, useFormik } from 'formik';
import { FormInputWithoutLabel } from 'modules/UI';
import React from 'react';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Button } from 'modules/UI';

export const forgotSchema = Yup.object().shape({
  key: Yup.number().required('Код восстановления обязателен для заполнения'),
});

export const KeyStep = ({
  step,
  setStep,
  token,
  setCode,
}: {
  step: number;
  setStep: CallableFunction;
  token: string;
  setCode: CallableFunction;
}) => {
  const formik = useFormik({
    initialValues: {
      key: '',
    },
    validationSchema: forgotSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      requestPassword(token, values.key).then(({ data }) => {
        if (Boolean(data) == true) {
          setCode(values.key);
          setStep(step + 1);
        }
      });
    },
  });
  return (
    <>
      <Form className='auth__form form' onSubmit={formik.handleSubmit}>
        <div className={'form__body'}>
          {formik.errors.key && formik.touched.key ? (
            <div className={'form__notification'}>{formik.errors.key}</div>
          ) : null}
          {/* <Field /> */}
          <div className='form__label-auth'>
            Введите код, отправленный вам на эл. почту
          </div>
          <FormInputWithoutLabel
            placeholder='Код восстановления'
            id='key'
            type={'text'}
            onChange={formik.handleChange}
            value={formik.values.key}
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
