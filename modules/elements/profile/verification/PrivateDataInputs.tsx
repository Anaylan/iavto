import {
  FormInputWithMaskNotLabel,
  FormInputWithoutLabel,
  FormLabel,
} from 'modules/UI';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { Col } from 'react-bootstrap';

interface IUserPrivateData {
  lastname?: string | undefined;
  firstname: string;
  secondname?: string | undefined;
  telephone?: string | undefined;
}

export const phoneNumberMask = [
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

export const PrivateDataInputs = ({
  user,
  onChange,
}: {
  user: IUserPrivateData;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Ваше имя</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            id='firstname'
            placeholder='Иван'
            defaultValue={user.firstname}
            onChange={onChange}
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className={'d-flex justify-content-md-end'}>
        <FormLabel type='text'>Ваша фамилия</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            id='lastname'
            placeholder='Иванов'
            defaultValue={user.lastname || ''}
            onChange={onChange}
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Ваше отчество</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            id='secondname'
            placeholder='Иванович'
            defaultValue={user.secondname || ''}
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
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
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Дата рождения</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='date'
            id={'birthday'}
            defaultValue='1990-12-27'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Место рождения</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            id={'place'}
            placeholder='г. Москва, Московская обл.'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
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
            required
          />
        </div>
      </Col>
    </>
  );
};
