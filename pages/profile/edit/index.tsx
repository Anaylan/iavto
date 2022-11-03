import { TITLE } from 'app/config'
import form from 'assets/sass/components/profile/form.verification.module.scss'
import verif from 'assets/sass/components/profile/verification.module.scss'
import { EditInfo } from 'modules/elements/profile/editInfo'
import { FormInputWithoutLabel, FormLabel } from 'modules/UI'
import Head from 'next/head'
import { Col, Container, Row } from 'react-bootstrap'
import { DocumentsDataInputs } from 'modules/elements/profile/verification/DocumentsDataInputs'
import { PrivateDataInputs } from 'modules/elements/profile/verification/PrivateDataInputs'
import { RelativeDataInputs } from 'modules/elements/profile/verification/RelativeDataInputs'
import { getUserByToken } from 'api/AuthCrud'
import { useState, useEffect } from 'react'
import { UserModel } from 'app/models/user/UserModel'
import { useRouter } from 'next/router'

const Links = [{}]


const EditProfile = () => {
  const [user, setUser] = useState({data: null, status: 200})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getUserByToken()
      .then(({data}: {data:UserModel}) => {
        setUser(data)
        setLoading(false)})
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const router = useRouter()
  
  useEffect(() => {
    if (user.status === 403) {
      router.push('auth/asign')
    }
  }, [user])
  

  console.log(user)
  return (
    <>
      <Head>
        <title>Редактировать профиль | {TITLE}</title>
      </Head>

      {user.data && <EditInfo user={user.data} />}

      <section>
        <Container>
          <Row className={verif['verification__body']}>
            <h2 className='info-profile__title title'>Верификация аккаунта</h2>
            <h3 className='subtitle'>
              Данная информация будет передаваться автопаркам при заказе
              автомобиля. На основе информации, указанной ниже, мы составляем
              договор на аренду автомобиля.
            </h3>

            <form
              className={`${verif['verification__form']} ${form['form']}`}
              action=''
              method=''
            >
              <div className={form['form__body']}>
                {user.data && 
                <Row className={form['form__row']}>  
                  <PrivateDataInputs />
                  <DocumentsDataInputs />
                  <RelativeDataInputs />
                </Row>}
                <div className='d-flex align-items-center justify-content-center'>
                  <button className='btn-main' type='submit'>
                    Отправить на проверку
                  </button>
                </div>
              </div>
            </form>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default EditProfile
