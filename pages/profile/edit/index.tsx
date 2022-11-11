import { getUserByToken } from 'api/User'
import { TITLE } from 'app/config'
import { UserModel } from 'app/models/user/UserModel'
import {
  DocumentsDataInputs,
  EditInfo,
  PrivateDataInputs,
  RelativeDataInputs
} from 'modules/elements'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import verif from 'assets/sass/components/profile/verification.module.scss'
import info from 'assets/sass/components/profile/infoprofile.module.scss'
import form from 'assets/sass/components/profile/form.verification.module.scss'

const EditProfile = () => {
  const [user, setUser] = useState<UserModel>({ data: null, status: 200 })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        setUser(data)
        setLoading(false)
      })
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
  }, [user, router])

  const onSubmit = (e: any) => {
    e.preventDefault()

    console.log('цель установлена, приступаю к бомбардировке')
  }
  console.log(user)
  return (
    <>
      <Head>
        <title>Редактировать профиль | {TITLE}</title>
      </Head>

      {user.data && (
        <>
          <EditInfo user={user.data} />
          {user.data.u_status === '0' && (
            <section className={`${verif['verification']}`}>
              <Container>
                <Row className={verif['verification__body']}>
                  <h2
                    className={`${info['info-profile__title']} ${verif['title']} title`}
                  >
                    Верификация аккаунта
                  </h2>
                  <h3 className={`${verif['subtitle']} subtitle`}>
                    Данная информация будет передаваться автопаркам при заказе
                    автомобиля. На основе информации, указанной ниже, мы
                    составляем договор на аренду автомобиля.
                  </h3>

                  <form
                    className={`${verif['verification__form']} ${verif['form']}`}
                  >
                    <div className={form['form__body']}>
                      <Row className={form['form__row']}>
                        <PrivateDataInputs user={user.data} />
                        <DocumentsDataInputs />
                        <RelativeDataInputs />
                      </Row>
                      <div className='d-flex align-items-center justify-content-center'>
                        <button
                          className={`${verif['btn-main']} btn-main`}
                          type='submit'
                        >
                          Отправить на проверку
                        </button>
                      </div>
                    </div>
                  </form>
                </Row>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  )
}

export default EditProfile
