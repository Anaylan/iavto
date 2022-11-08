import { getUserByToken } from 'api/AuthCrud'
import { getHotTender } from 'api/Company'
import { TITLE } from 'app/config'
import { UserModel } from 'app/models'

import {
  ProfileBalance,
  ProfileCard,
  ProfileDescription,
  ProfileFavorites,
  ProfileOrders,
  ProfileParthners,
  ProfileReviews,
  ProfileSettings,
  ProfileSupport
} from 'modules/elements/profile/profile'
import CarParkBlock from 'modules/templates/CarParkBlock'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useFetch } from 'app/hooks'

const Profile = () => {
  const [profile, setProfile] = useState<UserModel>({ data: null, status: 200 })
  // const [isLoading, setLoading] = useState<boolean>(false)
  const [isLoading, error] = useFetch(() => {
    getUserByToken().then(({ data }: { data: UserModel }) => {
      setProfile(data)
      console.log(data)
    })
  })

  const router = useRouter()

  useEffect(() => {
    if (profile.status === 403) {
      router.push('/auth/signin')
    }
    console.log('3')
  }, [profile, router])

  return (
    <>
      <Head>
        <title>Профиль | {TITLE}</title>
      </Head>
      <section className='profile'>
        <Container>
          <div className='profile__body'>
            {profile.data && (
              <>
                <Row className={'profile__row'}>
                  <ProfileCard profile={profile.data} />
                  <ProfileDescription description={profile.data.description} />
                </Row>
                <Row className='profile__row'>
                  <ProfileParthners
                    balance={profile.data.partners_balance.replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1 '
                    )}
                  />
                  <ProfileBalance
                    balance={profile.data.balance.replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1 '
                    )}
                  />
                  <ProfileFavorites type={1} />
                </Row>
                <Row className='profile__row'>
                  <ProfileOrders />
                  <ProfileReviews />
                  <ProfileFavorites type={0} />
                </Row>
                <Row className='profile__row'>
                  <ProfileSettings />
                  <ProfileSupport />
                </Row>
              </>
            )}
          </div>
        </Container>
      </section>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12
        }}
        getData={getHotTender}
        large={true}
      />
    </>
  )
}

export default Profile
