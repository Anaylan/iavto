import { register } from 'api/User';
import { UserModel } from 'app/models';
import { useFormik } from 'formik';
import { FormInputWithLabel, FormInputWithMask } from 'modules/UI';
import Form from 'modules/UI/forms/Form';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { TITLE } from 'app/config';
import * as header from 'app/redux/reducers/authReducer';
import * as ref from 'app/redux/reducers/referralReducer';

const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[0-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Имя: Минимум 3 символа')
    .max(50, 'Имя: Максимум 50 символов')
    .required('Имя обязательно для заполнения'),
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения'),
  lastname: Yup.string()
    .min(3, 'Фамилия: Минимум 3 символа')
    .max(50, 'Фамилия: Максимум 50 символов')
    .required('LФамилия обязательна для заполнения'),
  password: Yup.string()
    .min(3, 'Пароль: Минимум 8 символов')
    .required('Пароль обязателен для заполнения'),
  terms: Yup.bool().oneOf(
    [true],
    'Для регистрации вы должны принять пользовательское соглашение',
  ),
});

export const Register: React.FC<UserModel> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(
    ({ header }: { header: header.IAuthState }) => header.title,
  );

  const ref_code = useSelector(
    ({ referral }: { referral: ref.IReferralState }) => referral.ref_code,
  );

  if (user) {
    router.push('/');
  }

  const formik = useFormik({
    initialValues: {
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      phone: '',
      terms: false,
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setLoading(true);
      register(
        values.email,
        values.password,
        values.firstname,
        values.lastname,
        values.phone,
        ref_code,
      )
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          if (data.message) {
            setError(data.message);
          }
          data.token && dispatch(header.actions.register(data.token));
          if (data.token) {
            router.replace('/');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Регистрация | {TITLE}</title>
      </Head>
      <section className='auth'>
        <div className='container'>
          <div className={'auth__body'}>
            <h1 className={'auth__title'}>Регистрация</h1>

            <Form onSubmit={formik.handleSubmit}>
              <div className={'mt-2'}>
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className={'form__notification'}>
                    {formik.errors.lastname}
                  </div>
                ) : null}
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className={'form__notification'}>
                    {formik.errors.firstname}
                  </div>
                ) : null}
                {formik.touched.email && formik.errors.email ? (
                  <div className={'form__notification'}>
                    {formik.errors.email}
                  </div>
                ) : null}
                {formik.touched.password && formik.errors.password ? (
                  <div className={'form__notification'}>
                    {formik.errors.password}
                  </div>
                ) : null}
                {formik.touched.phone && formik.errors.phone ? (
                  <div className={'form__notification'}>
                    {formik.errors.phone}
                  </div>
                ) : null}
                {formik.touched.terms && formik.errors.terms ? (
                  <div className={'form__notification'}>
                    {formik.errors.terms}
                  </div>
                ) : null}
              </div>
              {formik.status && (
                <div className='mb-lg-15 alert alert-danger'>
                  <div className='alert-text font-weight-bold'>
                    {formik.status}
                  </div>
                </div>
              )}
              {error ? <div>{error}</div> : null}
              <div className={'form__body'}>
                <FormInputWithLabel
                  title={'E-Mail'}
                  name={'email'}
                  type={'email'}
                  onChange={formik.handleChange}
                  placeholder={formik.values.email}
                  className={
                    '' +
                    (formik.touched.email && formik.errors.email
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
                <FormInputWithLabel
                  title={'Имя'}
                  name={'firstname'}
                  type={'firstname'}
                  onChange={formik.handleChange}
                  placeholder={formik.values.firstname}
                  className={
                    '' +
                    (formik.touched.firstname && formik.errors.firstname
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
                <FormInputWithLabel
                  title={'Фамилия'}
                  name={'lastname'}
                  type={'lastname'}
                  onChange={formik.handleChange}
                  placeholder={formik.values.lastname}
                  className={
                    '' +
                    (formik.touched.lastname && formik.errors.lastname
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
                <FormInputWithMask
                  title={'Номер телефона'}
                  name={'phone'}
                  type={'phone'}
                  mask={phoneNumberMask}
                  placeholder={formik.values.phone}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.touched.phone && formik.errors.phone
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
                <FormInputWithLabel
                  title={'Пароль'}
                  name={'password'}
                  type={'password'}
                  onChange={formik.handleChange}
                  placeholder={formik.values.password}
                  className={
                    '' +
                    (formik.touched.password && formik.errors.password
                      ? 'form-control is-valid'
                      : 'is-invalid form-control form-control-lg form-control-solid')
                  }
                />
              </div>
              <div className={'form__bottom'}>
                <div className={'form__btn-group'}>
                  <div className={'form__btn-wrap'}>
                    <input
                      type='checkbox'
                      name='terms'
                      onChange={formik.handleChange}
                    />{' '}
                    Я принимаю{' '}
                    <Link href='/documents/terms'>
                      Пользовательское соглашение
                    </Link>
                    <button
                      type={'submit'}
                      className={`btn-main btn-main-trp mt-2`}
                      style={{ background: 'transparent' }}>
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
