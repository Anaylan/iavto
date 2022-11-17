import { UserDataModel } from 'app/models';
import { useFormik } from 'formik';
import {
  Textarea,
  FormInputWithMaskNotLabel,
  FormInputWithoutLabel,
  FormLabel,
  ProfileImg,
  Button,
} from 'modules/UI';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { requestEdit } from 'api/User';
import * as Yup from 'yup';
import { useState } from 'react';

const phoneNumberMask = [
  '+',
  '7',
  ' ',
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

export const editSchema = Yup.object().shape({
  email: Yup.string()
    .email('Неправильный формат email')
    .required('Email обязателен для заполнения'),
  description: Yup.string()
    // Max 500 symbols
    .max(500, 'О себе: Максимум 500 символов'),
});

export const EditInfo = ({ user }: { user: UserDataModel }) => {
  const [error, setError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      firstname: user.firstname,
      telephone: user.telephone,
      email: user.email,
      description: user.description,
    },
    validationSchema: editSchema,
    onSubmit(values) {
      requestEdit({ ...values }).then(({ data }) => {
        console.log(data);
        if (data.message) {
          setError(data.message);
        }
      });
    },
  });
  return (
    <section>
      <Container>
        <Row className={'info-profile__row'}>
          <h1 className={`info-profile__title title d-sm-none`}>
            Информация профиля
          </h1>
          <Col xs={12} sm={5} md={4}>
            <ProfileImg avatar={user.avatar} />
          </Col>
          <Col xs={12} md={8} sm={7}>
            <div className={'info-profile__body'}>
              <Form
                onSubmit={formik.handleSubmit}
                className={`verification__form form`}>
                {formik.status && (
                  <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>
                      {formik.status}
                    </div>
                  </div>
                )}
                <div className={'form__body'}>
                  <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={9}>
                      <h1
                        className={`info-profile__title title d-none d-sm-block`}>
                        Информация профиля
                      </h1>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text'>Ваше имя</FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <FormInputWithoutLabel
                        type='text'
                        placeholder='Иван Иванов'
                        defaultValue={user.firstname}
                        disabled
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text'>Номер телефона</FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <FormInputWithMaskNotLabel
                        type={'text'}
                        mask={phoneNumberMask}
                        defaultValue={user.telephone}
                        disabled
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text'>E-mail</FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <FormInputWithoutLabel
                        type='email'
                        name='email'
                        onChange={formik.handleChange}
                        defaultValue={user.email}
                        className={
                          '' +
                          (formik.errors.email
                            ? 'is-invalid form-control form-control-lg form-control-solid'
                            : 'form-control is-valid')
                        }
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text'>О себе</FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={'form__wrap'}>
                        <Textarea
                          name='description'
                          defaultValue={user.description}
                          onChange={formik.handleChange}
                          className={
                            '' +
                            (formik.errors.description
                              ? 'is-invalid form-control form-control-lg form-control-solid'
                              : 'form-control is-valid')
                          }
                        />
                      </div>
                    </Col>
                    <div className='mt-2'>
                      {formik.errors.email && formik.touched.email ? (
                        <div className='form__notification d-flex justify-content-end'>
                          {formik.errors.email}
                        </div>
                      ) : null}
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <div className='form__notification d-flex justify-content-end'>
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </div>
                    {error ? <div>{error}</div> : null}
                    <Col xs={12} className='d-flex justify-content-end'>
                      <Button type='submit'>Отправить</Button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
