import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import { Col, Container, Row } from 'react-bootstrap'

export const RelativeDataInputs = () => {
  return (
    <>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'ФИО Родственника №1'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Кем он для вас является'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Папа'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'ФИО Родственника №2'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Кем он для вас является'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Мама'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'ФИО Родственника №3'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Кем он для вас является'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Бабушка'
            required
          />
        </div>
      </Col>
    </>
  )
}