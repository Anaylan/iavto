import {
  FormInputWithMaskNotLabel,
  FormInputWithoutLabel,
  FormLabel,
} from 'modules/UI';
import { Col } from 'react-bootstrap';

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

export const DocumentsDataInputs = () => {
  return (
    <>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Серия и номер паспорта</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithMaskNotLabel
            type='text'
            placeholder='0000 111111'
            mask={passportNumberMask}
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Кем выдан</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Как в паспорте'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Дата выдачи</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Как в паспорте'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Код подразделения</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithMaskNotLabel
            type='text'
            placeholder='000-000'
            mask={departmentNumberMask}
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Номер водительского удостоверения</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithMaskNotLabel
            type='text'
            placeholder='00 00 000000'
            mask={driverLicenceMask}
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>
          Дата получения водительского удостоверения
        </FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='date'
            defaultValue='2008-12-27'
            required
          />
        </div>
      </Col>
    </>
  );
};
