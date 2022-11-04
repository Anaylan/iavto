import { getUserByToken } from 'api/AuthCrud'
import { TITLE } from 'app/config'
import { UserModel } from 'app/models/user/UserModel'
import form from 'assets/sass/components/profile/form.verification.module.scss'
import info from 'assets/sass/components/profile/infoprofile.module.scss'
import verif from 'assets/sass/components/profile/verification.module.scss'
import { DocumentsDataInputs, PrivateDataInputs, RelativeDataInputs } from 'modules/elements'
import { EditInfo } from 'modules/elements/profile/editInfo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'

const Links = [{}]


{/* Блять вы заебали, children передаётся как <div>chilren</div>, это children, а то что вы написали - хуйня какая-то */}
// P.S было <FormLabel type='text' children='Ваше имя' />, для особо одарённых ещё раз
//  <FormLabel type='text'>children</FormLabel> - это правильная запись.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Это от САНИ, САНЬКА, САНЁЧКА, САШИ, САШЕЧКИ, АЛЕКСАНДРА


const EditProfile = () => {
  const [user, setUser] = useState<UserModel>({data: null, status: 200})
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
  }, [user, router])
  
  const onSubmit = (e: any) => {
      e.preventDefault();

      console.log('цель установлена, приступаю к бомбардировке')
  }
  console.log(user)
  return (
    <>
      <Head>
        <title>Редактировать профиль | {TITLE}</title>
      </Head>

      {user.data && 
      <>
        <EditInfo user={user.data} />
        {user.data.u_status === "0" &&
        <section className={`${verif['verification']}`}>
          <Container>
            <Row className={verif['verification__body']}>
              <h2 className={`${info['info-profile__title']} ${verif['title']} title`}>Верификация аккаунта</h2>
              <h3 className={`${verif['subtitle']} subtitle`}>
                Данная информация будет передаваться автопаркам при заказе
                автомобиля. На основе информации, указанной ниже, мы составляем
                договор на аренду автомобиля.
              </h3>
              
              <form
                className={`${verif['verification__form']} ${verif['form']}`}
                onSubmit={}
              >
                <div className={form['form__body']}>
                  
                  <Row className={form['form__row']}>  
                    <PrivateDataInputs user={user.data} />
                    <DocumentsDataInputs />
                    <RelativeDataInputs />
                  </Row>
                  <div className='d-flex align-items-center justify-content-center'>
                    <button className={`${verif['btn-main']} btn-main`} type='submit'>
                      Отправить на проверку
                    </button>
                  </div>
                </div>
              </form>
            </Row>
          </Container>
        </section>
        }
      </>
      } 
    </>
  )
}

export default EditProfile
