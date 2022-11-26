import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { Col, Container, FormLabel, Row } from 'react-bootstrap';
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

export const feedbackSchema = Yup.object().shape({
  firstname: Yup.string().required('Имя обязательно для заполнения'),
  email: Yup.string().required('Email обязательна для заполнения'),
  phone: Yup.string().required('Номер телефона обязательно для заполнения'),
  info: Yup.string().required('Сообщение обязательно для заполнения'),
});

// сделано перенаправление на in_dev

export default function Partners() {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      phone: '',
      info: '',
    },
    validationSchema: feedbackSchema,
    onSubmit: (values) => {
      console.log(values);
      requestInvestor(values);
      // TODO: метод для отправки
    },
  });
  return (
    <>
      <Head>
        <title>Партнёры | {TITLE}</title>
      </Head>
      <Container>
        <section>
          <h1 className='title'>Информация для партнёров</h1>
          <p className='mb-4 text-muted'>Вы можете стать нашим партнёром!</p>
          <p className='mb-4 text-muted'>
            Для этого вам нужно подать заявку и мы рассмотрим ваше предложение.
          </p>
          <p className='mb-4 text-muted'>Что даёт партнерство с ЯАВТО.РФ?</p>
          <p className='mb-4 text-muted'>
            Ваш Телеграм канал, группа в ВКонтакте или любой другой продукт
            будет размещен на нашем официальном сайте, который увидят водители
            такси и автопарки. Вам нужно только подать заявку на вступление, мы
            рассмотрим ваш продукт и пришлем письмо на указанную вами почту. В
            письме будет ответ на предложение, и в случае положительного ответа
            - заявка на оплату партнерства на месяц или более.
          </p>
          <h3 className='mb-4 text-muted'>Что указать в графе информации?</h3>
          <ol className='text-muted list-group-circle'>
            <li className='list-group-item'>
              Cсылку на ваш продукт для ознакомления
            </li>
            <li className='list-group-item'>
              Возможные вопросы, которые у вас имеются
            </li>
            <li className='list-group-item'>
              Срок партнерства, если уже определились и уверены, что хотите
              стать нашими партнерами ( 1 месяц, 2 месяца и т.д.)
            </li>
          </ol>
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
                    <FormLabel type='text'>Ваше имя</FormLabel>
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
                    <FormLabel type='text'>Номер телефона</FormLabel>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <FormInputWithMask
                        type='text'
                        id={'phone'}
                        mask={phoneNumberMask}
                        placeholder='+7 (999) 000-00-00'
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
                    <FormLabel type='text'>Email</FormLabel>
                  </Col>
                  <Col xs={12} md={7} lg={8}>
                    <div className='form__wrap'>
                      <FormInputWithoutLabel
                        type='text'
                        id='email'
                        value={formik.values.email}
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
                    <FormLabel type='text'>
                      Расскажите, информацию о вас или о вашем продукте
                    </FormLabel>
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
