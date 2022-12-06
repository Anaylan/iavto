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
// 16
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
    .required('Фамилия обязательна для заполнения'),
  phone: Yup.string()
    .min(16, 'Номер телефона обязателен для заполнения')
    .max(16, 'Номер телефона обязателен для заполнения')
    .required('Номер телефона обязателен для заполнения')
    .matches(
      /^(\+7|7|8)\(?[489][0-9]{2}\)[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      'Номер телефона введён неправильно',
    ),
  password: Yup.string()
    .required('Пароль обязателен для заполнения')
    .matches(/[0-9]/, 'Пароль должен иметь минимум 1 цифру')
    .matches(/[a-z]/, 'Пароль должен иметь минимум 1 прописную букву')
    .matches(/[A-Z]/, 'Пароль должен иметь минимум 1 заглавную букву'),
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
      phone: '+7 ',
      terms: false,
    },
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
        });
    },
    validationSchema: registrationSchema,
  });

  return (
    <>
      <Head>
        <title>Регистрация | {TITLE}</title>
      </Head>
      <section className='auth reg'>
        <div className='container'>
          <div className='auth__wrapper'>
            <div className={'auth__body'}>
              <div className='auth__header'>
                <Link className={'header-top__logo'} href={'/'}>
                  яавто.рф
                </Link>
              </div>
              <h1 className={'auth__title'}>Регистрация</h1>
              {error && <div className={'form__notification'}>{error}</div>}
              <Form onSubmit={formik.handleSubmit}>
                {error ? <div>{error}</div> : null}
                <div className={'form__body'}>
                  {formik.touched.email && formik.errors.email ? (
                    <div className={'form__notification'}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                  <FormInputWithLabel
                    placeholder={'E-Mail'}
                    name={'email'}
                    type={'email'}
                    onChange={formik.handleChange}
                    className={
                      '' +
                      (!formik.errors.email
                        ? 'form-control is-valid'
                        : 'is-invalid form-control form-control-lg form-control-solid')
                    }
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className={'form__notification'}>
                      {formik.errors.firstname}
                    </div>
                  ) : null}
                  <FormInputWithLabel
                    placeholder={'Имя'}
                    name={'firstname'}
                    type={'firstname'}
                    onChange={formik.handleChange}
                    className={
                      '' +
                      (!formik.errors.firstname
                        ? 'form-control is-valid'
                        : 'is-invalid form-control form-control-lg form-control-solid')
                    }
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className={'form__notification'}>
                      {formik.errors.lastname}
                    </div>
                  ) : null}
                  <FormInputWithLabel
                    placeholder={'Фамилия'}
                    name={'lastname'}
                    type={'lastname'}
                    onChange={formik.handleChange}
                    className={
                      '' +
                      (!formik.errors.lastname
                        ? 'form-control is-valid'
                        : 'is-invalid form-control form-control-lg form-control-solid')
                    }
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={'form__notification'}>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                  <FormInputWithMask
                    title={'Номер телефона'}
                    name={'phone'}
                    type={'phone'}
                    mask={phoneNumberMask}
                    value={formik.values.phone}
                    placeholder={formik.values.phone}
                    onChange={formik.handleChange}
                    className={
                      '' +
                      (!formik.errors.phone
                        ? 'form-control is-valid'
                        : 'is-invalid form-control form-control-lg form-control-solid')
                    }
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className={'form__notification'}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <FormInputWithLabel
                    placeholder={'Пароль (латинские буквы)'}
                    name={'password'}
                    type={'password'}
                    onChange={formik.handleChange}
                    className={
                      '' +
                      (!formik.errors.password
                        ? 'form-control is-valid'
                        : 'is-invalid form-control form-control-lg form-control-solid')
                    }
                  />
                </div>
                {formik.touched.terms && formik.errors.terms ? (
                  <div className={'form__notification'}>
                    {formik.errors.terms}
                  </div>
                ) : null}
                <div className={'form__bottom'}>
                  <div className={'form__link-wrap'}>
                    <span>Есть учетная запись?</span>
                    <Link href={'/auth/signin'}>Войти</Link>
                  </div>
                  <div className={'form__btn-group'}>
                    <div className={'form__btn-wrap'}>
                      <div className='form__terms-wrap'>
                        <label
                          className={`form__terms search-tariffs__checkbox ${
                            formik.values.terms ? 'checkbox-active' : ''
                          }`}>
                          <input
                            type='checkbox'
                            name='terms'
                            defaultChecked={false}
                            onChange={formik.handleChange}
                            className={'form-check-input'}
                          />{' '}
                          <span>Я принимаю</span>{' '}
                        </label>
                        <Link href='/documents/terms' target='_blank'>
                          Пользовательское соглашение
                        </Link>
                      </div>
                      <button type={'submit'} className={`btn-main`}>
                        Зарегистрироваться
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
