import { login } from 'api/User';
import { TITLE } from 'app/config';
import { UserModel } from 'app/models';
import * as auth from 'app/redux/reducers/authReducer';
import { Load } from 'assets/icon/icons';
import { useFormik } from 'formik';

import { Button, FormInputWithLabel } from 'modules/UI';
import Form from 'modules/UI/forms/Form';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export const Login: FC<UserModel> = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(
    ({ header }: { header: auth.IAuthState }) => header.title,
  );

  if (user) {
    router.push('/');
  }

  // const massiv = JSON.parse(localStorage.getItem('persist:root').then(res=>))
  // console.log(JSON.parse(massiv.auth))
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setLoading(true);
      login(values.email, values.password)
        .then(({ data }) => {
          console.log(data);
          setLoading(false);
          dispatch(auth.actions.login(data.token));
          if (data.token) {
            router.push('/');
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Авторизация | {TITLE}</title>
      </Head>
      <section className={`auth align-items-center`}>
        <div className='text-center'>
          {loading && (
            <div>
              <Load />
            </div>
          )}
        </div>
        <Container>
          <div className={'auth__body'}>
            <h1 className={'auth__title'}>Вход в существующий аккаунт</h1>
            <Form onSubmit={formik.handleSubmit}>
              <div className={'form__body'}>
                <FormInputWithLabel
                  title={'Email'}
                  name={'email'}
                  required
                  type={'email'}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormInputWithLabel
                  title={'Пароль'}
                  name={'password'}
                  required
                  type={'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <div className={'form__help'}>
                  <Link href='/auth/forgot-password'>Забыли пароль?</Link>
                </div>
              </div>
              <div className={'form_' + '_bottom'}>
                <div className={'form__btn-group'}>
                  <div className={'form__btn-wrap'}>
                    <Button type={'submit'}>Войти</Button>
                  </div>
                  <div className={'form__btn-wrap'}>
                    <Link
                      className={`btn-main btn-main-trp`}
                      href={'/auth/signup'}
                    >
                      Зарегистрироваться
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
