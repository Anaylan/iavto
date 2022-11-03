import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import { Col, Container, Row } from 'react-bootstrap'

export const DocumentsDataInputs = () => {
  return (
    <>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Серия и номер паспорта'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='number'
            defaultValue='0000 111111'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Кем выдан'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Как в паспорте'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Дата выдачи'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            defaultValue='Как в паспорте'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel type='text' children={'Код подразделения'} />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='number'
            defaultValue='000-000'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Номер водительского удостоверения'}
        />
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='number'
            defaultValue='00 00 000000'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} d-flex justify-content-md-end>
        <FormLabel
          type='text'
          children={'Дата получения водительского удостоверения'}
        />
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
  )
}