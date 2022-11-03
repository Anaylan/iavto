import verif from 'assets/sass/components/profile/verification.module.scss'
import form from 'assets/sass/components/profile/form.verification.module.scss'
import { ProfileImg } from 'modules/UI/images/ProfileImg'
import { Col, Container, Row } from 'react-bootstrap'
import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import { Textarea } from 'modules/UI/textarea/textarea'

interface IUserInfoModel {
  user: {
    email: string
    lastname?: string | undefined
    firstname: string
    secondname?: string | undefined
    telephone?: string | undefined
    avatar?: string | undefined
    description?: string | undefined
  }
}

export const EditInfo = ({user}: {user: IUserInfoModel}) => {
  return (
    <section>
      <Container>
        <Row className={verif['info-profile__row']}>
          <h1 className={`info-profile__title ${verif['title']} d-sm-none`}>
            Информация профиля
          </h1>

          <Col xs={12} sm={5} md={4}>
            <ProfileImg avatar={user.image} />
          </Col>
          <Col xs={12} md={8} sm={7}>
            <div className={verif['info-profile__body']}>
              <form
                className={`${verif['verification__form']} ${verif['form']}`}
                action=''
                method=''
              >
                <div className={verif['form__body']}>
                  <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={9}>
                      <h1
                        className={
                          'info-profile__title title d-none d-sm-block'
                        }
                      >
                        Информация профиля
                      </h1>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text' children={'Ваше имя'} />
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={verif['form__wrap']}>
                        <FormInputWithoutLabel
                          type='text'
                          placeholder='Иван Иванов'
                          value={user.firstname}
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text' children={'Номер телефона'} />
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={verif['form__wrap']}>
                        <FormInputWithoutLabel
                          type='number'
                          placeholder='+7 (999) 000-00-00'
                          defaultValue={user.telephone}
                          // value don't watch
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text' children={'E-mail'} />
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={verif['form__wrap']}>
                        <FormInputWithoutLabel
                          type='email'
                          defaultValue={user.email}
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <FormLabel type='text' children={'О себе'} />
                    </Col>
                    <Col xs={12} md={9}>
                      <div className={verif['form__wrap']}>
                        <Textarea type='text'>
                          {user.desciption}
                        </Textarea>
                      </div>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
