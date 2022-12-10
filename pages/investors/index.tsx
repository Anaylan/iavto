import React, { useState } from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Col, Container, Row } from 'react-bootstrap';
import { FormInputWithMask, FormInputWithoutLabel, Textarea } from 'modules/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getErrorMessages } from 'modules/elements/profile/verification/FormVerification';
import { requestInvestor } from 'api/Feedback';

const phoneNumberMask = [
  '+',
  '7',
  '(',
  /[1-9]/,
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
  '-',
  /\d/,
  /\d/,
];

// Для номера телефона, почему-то не работает

export const feedbackSchema = Yup.object().shape({
  email: Yup.string().email('Неправильный формат email').required('Email обязательна для заполнения'),
  phone: Yup.string()
    .required('Номер телефона обязательно для заполнения')
    .matches(
      /^(\+7|7|8)\(?[489][0-9]{2}\)[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      'Номер телефона неправильный',
    ),
  info: Yup.string().required('Сообщение обязательно для заполнения'),
  firstname: Yup.string().required('Имя обязательно для заполнения'),
});

// сделано перенаправление на in_dev

export default function Investors() {
  const [messages, setMessages] = useState('');
  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      phone: '',
      info: '',
    },
    validationSchema: feedbackSchema,
    onSubmit: (values) => {
      // console.log(values);
      requestInvestor(values).then(({ data }: { data: boolean }) => {
        if (data == true) {
          setMessages('Сообщение отправлено');
        }
      });
      // TODO: метод для отправки
    },
  });
  return (
    <>
      <Head>
        <title>Инвесторам | {TITLE}</title>
      </Head>
      <Container>
        <section>
          <h1 className='title'>Инвесторам</h1>
          <h2 className='subtitle'>
            <p className='mb-3 fw-bold'>Вы можете стать инвестором проекта ЯАВТО.РФ</p>
            <p className='mb-1'>
              Если вы желаете стать инвестором и участником нового и современного IT проекта ЯАВТО.РФ, заполните форму обратной связи.
            </p>
            <p>
              Мы рассмотрим ваше заявление и свяжемся с вами в ближайшее время.
            </p>
          </h2>
        </section>

        <section className='verification'>
          <Row className={'verification__body'}>
            <form onSubmit={formik.handleSubmit} className={`form`}>
              <div className='form__body'>
                <Row className='form__row'>
                  <Col
                    xs={12}
                    md={5}
                    lg={4}
                    className='d-flex justify-content-md-end'>
                    <label className='form__label'>Ваше имя</label>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <FormInputWithoutLabel
                        type='text'
                        id='firstname'
                        placeholder='Иван'
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        className={
                          '' +
                          (formik.errors.firstname
                            ? 'is-invalid form-control form-control-lg form-control-solid'
                            : 'form-control is-valid')
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    md={5}
                    lg={4}
                    className='d-flex justify-content-md-end'>
                    <label className='form__label'>Номер телефона</label>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <FormInputWithMask
                        type='text'
                        id={'phone'}
                        value={formik.values.phone}
                        mask={phoneNumberMask}
                        onChange={formik.handleChange}
                        className={
                          '' +
                          (formik.errors.phone
                            ? 'is-invalid form-control form-control-lg form-control-solid'
                            : 'form-control is-valid')
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    md={5}
                    lg={4}
                    className='d-flex justify-content-md-end'>
                    <label className='form__label'>Email</label>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <FormInputWithoutLabel
                        type='email'
                        id='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={
                          '' +
                          (formik.errors.email
                            ? 'is-invalid form-control form-control-lg form-control-solid'
                            : 'form-control is-valid')
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    md={5}
                    lg={4}
                    className='d-flex justify-content-md-end'>
                    <label className='form__label'>
                       Опишите ваше предложение
                    </label>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <Textarea
                        value={formik.values.info}
                        onChange={formik.handleChange}
                        id='info'
                      />
                    </div>
                  </Col>
                  {getErrorMessages(formik.errors)}
                </Row>
                {messages && <div className={'complete'}>{messages}</div>}
                <div className='d-flex align-items-center justify-content-center'>
                  <button className={`btn-main btn-main`} type='submit'>
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          </Row>
        </section>
      </Container>
    </>
  );
}
