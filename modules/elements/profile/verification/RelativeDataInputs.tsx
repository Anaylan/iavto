import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import { Col } from 'react-bootstrap'

export const RelativeDataInputs = () => {
  return (
    <>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>ФИО Родственника №1</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Кем он для вас является</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Папа'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>ФИО Родственника №2</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Кем он для вас является</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Мама'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>ФИО Родственника №3</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Иванов Иван Иванович'
            required
          />
        </div>
      </Col>
      <Col xs={12} md={5} lg={4} className='d-flex justify-content-md-end'>
        <FormLabel type='text'>Кем он для вас является</FormLabel>
      </Col>
      <Col xs={12} md={7} lg={8}>
        <div className='form__wrap'>
          <FormInputWithoutLabel
            type='text'
            placeholder='Бабушка'
            required
          />
        </div>
      </Col>
    </>
  )
}