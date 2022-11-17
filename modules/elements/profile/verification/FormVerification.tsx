import { requestVerification } from 'api/User';
import { UserDataModel } from 'app/models';
import { useFormik } from 'formik';
import {
  FormInputWithoutLabel,
  FormInputWithMaskNotLabel,
  FormInputWithMask,
} from 'modules/UI';
import React from 'react';
import { Row, Col, FormLabel } from 'react-bootstrap';
import { DocumentsDataInputs } from './DocumentsDataInputs';
import { RelativeDataInputs } from './RelativeDataInputs';
import * as Yup from 'yup';
import Link from 'next/link';

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

const dateNumberMask = [
  /[0-3]/,
  /\d/,
  '.',
  /[0-1]/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const passportNumberMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const departmentNumberMask = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/];

const driverLicenceMask = [
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const verifSchema = Yup.object().shape({
  firstname: Yup.string().required('Имя обязательно для заполнения'),
  lastname: Yup.string().required('Фамилия обязательна для заполнения'),
  secondname: Yup.string().required('Отчество обязательно для заполнения'),
  phone: Yup.string().required('Номер телефона обязателен для заполнения'),
  birthday: Yup.date()
    .required('Дата рождения обязательна для заполнения')
    .nullable(),
  place: Yup.string().required('Место рождения обязательно для заполнения'),
  links: Yup.string().required(
    'Ссылки на социальные сети обязательны для заполнения',
  ),
  pass_series: Yup.string().required(
    'Серия и номер паспорта обязательны для заполнения',
  ),
  pass_place: Yup.string().required(
    'Поле кем выдан обязательно для заполнения',
  ),
  pass_date: Yup.string().required('Дата выдачи обязательна для заполнения'),
  subdivision: Yup.string().required(
    'Код подразделения обязателен для заполнения',
  ),
  driver_date: Yup.date().required(
    'Дата получения водительского удостоверения обязательна для заполнения',
  ),
  pass_live: Yup.string().required(
    'Место регистрации обязательно для заполнения',
  ),
  driver_licence: Yup.string().required(
    'Номер водительского удостоверения обязателен для заполнения',
  ),
  relative_name_1: Yup.string().required(
    'ФИО Родственника №1 обязательно для заполнения',
  ),
  relative_name_2: Yup.string().required(
    'ФИО Родственника №2 обязательно для заполнения',
  ),
  relative_name_3: Yup.string().required(
    'ФИО Родственника №2 обязательно для заполнения',
  ),
  relative_1: Yup.string().required(
    'Поле кем он для вас является обязательно для заполнения',
  ),
  relative_2: Yup.string().required(
    'Поле кем он для вас является обязательно для заполнения',
  ),
  relative_3: Yup.string().required(
    'Поле кем он для вас является обязательно для заполнения',
  ),
  relative_phone_1: Yup.string().required(
    'Номер телефона родственника №1 обязателен для заполнения',
  ),
  relative_phone_2: Yup.string().required(
    'Номер телефона родственника №2 обязателен для заполнения',
  ),
  relative_phone_3: Yup.string().required(
    'Номер телефона родственника №3 обязателен для заполнения',
  ),
});

const getErrorMessages = (errors: object) => {
  for (let error in errors) {
    const item = errors[error as keyof object];
    let content = [];
    content.push(
      <div
        key={new Date().getTime()}
        className='form__notification d-flex justify-content-center'>
        {item}
      </div>,
    );
    return content;
  }
};

export const FormVerification = ({ user }: { user: UserDataModel }) => {
  const formik = useFormik({
    initialValues: {
      firstname: user.firstname,
      secondname: user.secondname,
      lastname: user.lastname,
      email: user.email,
      phone: user.telephone,
      birthday: '',
      place: '',
      links: '',
      pass_series: '',
      driver_date: '',
      pass_place: '',
      pass_date: '',
      pass_live: '',
      subdivision: '',
      driver_licence: '',
      relative_name_1: '',
      relative_name_2: '',
      relative_name_3: '',
      relative_1: '',
      relative_2: '',
      relative_3: '',
      relative_phone_1: '',
      relative_phone_2: '',
      relative_phone_3: '',
    },
    onSubmit(values) {
      requestVerification(values).then(({ data }) => {
        console.log(data);
      });
    },
    validationSchema: verifSchema,
  });
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={`verification__form form`}>
        <div className={'form__body'}>
          <Row className={'form__row'}>
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
                  defaultValue={user.firstname}
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
              className={'d-flex justify-content-md-end'}>
              <FormLabel type='text'>Ваша фамилия</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='lastname'
                  placeholder='Иванов'
                  defaultValue={user.lastname}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.lastname
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
              <FormLabel type='text'>Ваше отчество</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='secondname'
                  placeholder='Иванович'
                  defaultValue={user.secondname}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.secondname
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
              <FormLabel type='text'>Номер телефона для связи</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type={'phone'}
                  id={'phone'}
                  mask={phoneNumberMask}
                  placeholder='+7 (999) 000-00-00'
                  defaultValue={user.telephone}
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
              <FormLabel type='text'>Дата рождения</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='date'
                  id={'birthday'}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.birthday
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
              <FormLabel type='text'>Место рождения</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id={'place'}
                  placeholder='г. Москва, Московская обл.'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.place
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
                Ссылки на ваши социальные сети (через запятую)
              </FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id={'links'}
                  placeholder='vk.com/... , ok.com/...'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.links
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
              <FormLabel type='text'>Серия и номер паспорта</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  placeholder='0000 111111'
                  id={'pass_series'}
                  mask={passportNumberMask}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.pass_series
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
              <FormLabel type='text'>Кем выдан</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id={'pass_place'}
                  placeholder='Как в паспорте'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.pass_place
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
              <FormLabel type='text'>Дата выдачи</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='pass_date'
                  placeholder='Как в паспорте'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.pass_date
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
              <FormLabel type='text'>Место регистрации</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id={'pass_live'}
                  placeholder='г. Москва, Московская обл.'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.pass_live
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
              <FormLabel type='text'>Код подразделения</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  placeholder='000-000'
                  id={'subdivision'}
                  mask={departmentNumberMask}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.subdivision
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
                Номер водительского удостоверения
              </FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  placeholder='00 00 000000'
                  id={'driver_licence'}
                  mask={driverLicenceMask}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.driver_licence
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
                Дата получения водительского удостоверения
              </FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='date'
                  id={'driver_date'}
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.driver_date
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
              <FormLabel type='text'>ФИО Родственника №1</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='relative_name_1'
                  placeholder='Иванов Иван Иванович'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_name_1
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
              <FormLabel type='text'>Кем он для вас является</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='relative_1'
                  placeholder='Папа'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_1
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
              <FormLabel type='text'>Номер телефона родственника №1</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  id='relative_phone_1'
                  mask={phoneNumberMask}
                  placeholder='+7 (999) 000-00-00'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_phone_1
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
              <FormLabel type='text'>ФИО Родственника №2</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='relative_name_2'
                  placeholder='Иванов Иван Иванович'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_name_2
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
              <FormLabel type='text'>Кем он для вас является</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  placeholder='Мама'
                  id='relative_2'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_2
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
              <FormLabel type='text'>Номер телефона родственника №2</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  id='relative_phone_2'
                  mask={phoneNumberMask}
                  placeholder='+7 (999) 000-00-00'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_phone_3
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
              <FormLabel type='text'>ФИО Родственника №3</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  id='relative_name_3'
                  placeholder='Иванов Иван Иванович'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_name_3
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
              <FormLabel type='text'>Кем он для вас является</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithoutLabel
                  type='text'
                  placeholder='Бабушка'
                  id='relative_3'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_3
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
              <FormLabel type='text'>Номер телефона родственника №3</FormLabel>
            </Col>
            <Col xs={12} md={7} lg={8}>
              <div className='form__wrap'>
                <FormInputWithMaskNotLabel
                  type='text'
                  id='relative_phone_3'
                  mask={phoneNumberMask}
                  placeholder='+7 (999) 000-00-00'
                  onChange={formik.handleChange}
                  className={
                    '' +
                    (formik.errors.relative_phone_3
                      ? 'is-invalid form-control form-control-lg form-control-solid'
                      : 'form-control is-valid')
                  }
                />
              </div>
            </Col>
            {getErrorMessages(formik.errors)}
          </Row>
          <Link
            href='/documents/privacy_policy'
            className='d-flex justify-content-center'>
            Политика конфиденциальности
          </Link>
          <div className='d-flex align-items-center justify-content-center'>
            <button className={`btn-main btn-main`} type='submit'>
              Отправить на проверку
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
