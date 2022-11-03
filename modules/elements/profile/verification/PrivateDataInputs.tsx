import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import { Col, Container, Row } from 'react-bootstrap'

export const PrivateDataInputs = () => {
  return (
    <>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Ваше имя'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иван'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Ваша фамилия'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иванов'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Ваше отчество'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Номер телефона для связи'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='number'
            defaultValue='+7 (999) 000-00-00'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Дата рождения'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='date'
            defaultValue='1990-12-27'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Место рождения'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='г. Москва, Московская обл.'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={
            'Ссылки на ваши социальные сети (через запятую)'
          }
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='vk.com/... , ok.com/...'
            required
          />
        </div>
      </Col>
    </>
  )
}