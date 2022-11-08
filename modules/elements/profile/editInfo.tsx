import { UserDataModel } from 'app/models'
import form from 'assets/sass/components/form.module.scss'
import info from 'assets/sass/components/profile/infoprofile.module.scss'
import verif from 'assets/sass/components/profile/verification.module.scss'
import {
  Textarea,
  FormInputWithMaskNotLabel,
  FormInputWithoutLabel,
  FormLabel,
  ProfileImg
} from 'modules/UI'
import { Col, Container, Form, Row } from 'react-bootstrap'

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
  /\d/
]

export const EditInfo = ({ user }: { user: UserDataModel }) => {
  return (
    <section>
      <Container>
        <Row className={verif['info-profile__row']}>
          <h1
            className={`${info['info-profile__title']} ${verif['title']} d-sm-none`}
          >
            Информация профиля
          </h1>
          <Col xs={12} sm={5} md={4}>
            <ProfileImg avatar={user.avatar} />
          </Col>
          <Col xs={12} md={8} sm={7}>
            <div className={verif['info-profile__body']}>
              <Form className={`verification__form ${form['form']}`}>
                <div className={verif['form__body']}>
                  <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={9}>
                      <h1
                        className={`${info['info-profile__title']} title d-none d-sm-block`}
                      >
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
                        defaultValue={user.email}
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text'>О себе</FormLabel>
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={form['form__wrap']}>
                        <Textarea>{user.description}</Textarea>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
