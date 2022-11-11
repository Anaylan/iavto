import { TITLE } from 'app/config'
import table from 'assets/sass/components/tables/table.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { Pagination, PaginationItem } from 'modules/UI'
import bannersHover from 'assets/sass/components/banners/banners-hover.module.scss'
import banners from 'assets/sass/components/banners/banners.module.scss'
import tables from 'assets/sass/components/tables/tables.module.scss'
// import verif from 'assets/sass/'
import { Download } from 'assets/icon/icons'
// import { RentWidget } from 'modules/elements/widgets/RentWidget'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IRefModel, UserDataModel, UserModel } from 'app/models'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByToken } from 'api/User'
import { useRouter } from 'next/router'
import * as auth from 'app/redux/reducers/authReducer'
import { TCell, THead } from 'modules/UI/tables/table'
import { getAllReferer } from 'api/Refferal'
import { dbFormatDate, month } from 'libs/functions'

const THeadRow = [
  'Логин',
  'Дата регистрации',
  'Процент',
  'Платежи',
  'Прибыль',
  'Статус'
]

const RentWidget = dynamic(
  () => {
    return import('modules/elements/widgets/RentWidget')
  },
  { ssr: false }
)

export default function Partners() {
  const dispatch = useDispatch()
  const [referrals, setReferrals] = useState<IRefModel[]>([])
  let [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(10)
  const router = useRouter()
  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user
  )
  useEffect(() => {
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        if (data.status === 403) {
          router.push('/auth/signin')
        }
        if (user.id !== data.data?.id) {
          dispatch(auth.actions.logout())
        }
      })
      .catch((err) => {
        dispatch(auth.actions.logout())

        router.push('/auth/signin')
      })
  }, [user, dispatch, router])

  useEffect(() => {
    getAllReferer().then(({ data }: { data: IRefModel[] }) => {
      setReferrals(data)
    })
  }, [])
  console.log(referrals)
  return (
    <>
      <Head>
        <title>Партнёры | {TITLE}</title>
      </Head>
      <section className='charts'>
        <Container>
          <h1 className='title'>Информация о партнерстве</h1>
          <Row>
            <Col xs={12} lg={6}>
              Заработок
              <RentWidget className='' chartColor='black' chartHeight='30px' />
            </Col>
            <Col xs={12} lg={6}>
              Переходы по ссылке
              <RentWidget className='' chartColor='black' chartHeight='30px' />
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${tables['tables']}`}>
        <Container>
          <Row className={`${tables['tables__tabs']}`}>
            <section className={`${tables['tables__tab']}`}>
              <div className={`${table['table-responsive']}`}>
                <table className={`${table['table']}`}>
                  <THead row={THeadRow} />
                  <tbody>
                    {referrals.map((referral, key) => (
                      <tr key={key}>
                        <TCell>
                          <Link href='#'>
                            {referral.firstname} {referral.lastname}
                          </Link>
                        </TCell>
                        <TCell>{dbFormatDate(referral.created, month)}</TCell>
                        <TCell>DanilTech228</TCell>
                        <TCell>DanilTech228</TCell>
                        <TCell>DanilTech228</TCell>
                        <TCell className={table['table__wait']}>
                          DanilTech228
                        </TCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </Row>
          <Pagination>
            <PaginationItem>
              <Link href={'#'} className={'page-link'} aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </Link>
            </PaginationItem>
            <li className={`${tables['tables__pagination-value']}`}>
              <span>{currentPage}</span> из <span>{totalPage}</span>
            </li>
            <PaginationItem>
              <Link href={'#'} className={'page-link'} aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </Link>
            </PaginationItem>
          </Pagination>
        </Container>
      </section>

      <section className={`${banners['banners']}`}>
        <Container>
          <h2 className='title'>Баннеры</h2>
          <Row className={`${banners['banners__body']}`}>
            <Col className={`${banners['banners__col']}`} xs={12} sm={6} md={3}>
              <a className={`${banners['banners__item']}`} href='#'>
                <span className={`${banners['banners__img-wrap']}`}>
                  <span
                    className={`${banners['banners__img']} ${banners['banners__img_long']}`}
                  >
                    <Image
                      width={100}
                      height={100}
                      src='/media/banners/long/01.png'
                      alt=''
                    />
                  </span>
                  <span
                    className={`${banners['banners__hover']} ${bannersHover['banners-hover']}`}
                  >
                    <span className={`${bannersHover['banners-hover__body']}`}>
                      <span
                        className={`${bannersHover['banners-hover__title']}`}
                      >
                        Скачать баннер
                      </span>
                      <span className={`${bannersHover['icon']}`}>
                        <Download color={bannersHover['icon__item']} />
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${banners['banners']} ${banners['presentations']}`}>
        <Container>
          <h2 className='title'>Презентации</h2>
          <Row className={`${banners['banners__body']}`}>
            <Col className={`${banners['banners__col']}`} xs={12} sm={6} md={4}>
              <a className={`${banners['banners__item']}`} href='#'>
                <span
                  className={`${banners['banners__img-wrap']} ${banners['banners__img-wrap_shadow']}`}
                >
                  <span className={`${banners['banners__img']}`}>
                    <Image
                      width={100}
                      height={100}
                      src='/media/presentations/01.png'
                      alt=''
                    />
                  </span>
                  <span
                    className={`${banners['banners__hover']} ${bannersHover['banners-hover']}`}
                  >
                    <span className={`${bannersHover['banners-hover__body']}`}>
                      <span
                        className={`${bannersHover['banners-hover__title']}`}
                      >
                        Скачать презентацию
                      </span>
                      <span className={`${bannersHover['icon']}`}>
                        <Download color={bannersHover['icon__item']} />
                      </span>
                    </span>
                  </span>
                </span>
                <span className={`${banners['banners__link-wrap']}`}>
                  <span className={`${banners['profile-body__action']}`}>
                    Скачать презентацию для автопарков
                  </span>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
