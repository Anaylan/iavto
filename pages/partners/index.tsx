import { TITLE } from 'app/config'
import table from 'assets/sass/components/tables/table.module.scss'
import tableNav from 'assets/sass/components/tables/tables-nav.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import bannersHover from '/assets/sass/components/banners/banners-hover.module.scss'
import banners from '/assets/sass/components/banners/banners.module.scss'
import tables from '/assets/sass/components/tables/tables.module.scss'
// import verif from 'assets/sass/'
import { Download } from 'assets/icon/icons'
import { Button } from 'modules/UI'
// import { RentWidget } from 'modules/elements/widgets/RentWidget'
import dynamic from 'next/dynamic'

const RentWidget = dynamic(
  () => {
    return import('modules/elements/widgets/RentWidget')
  },
  { ssr: false }
)

export default function Partners() {
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
          <ul
            className={` ${tableNav['tables__tab-nav']} ${tableNav['tables-nav']} nav nav-pills`}
            id='pills-tab'
            role='tablist'
          >
            <li
              className={` ${tableNav['tables__tab-nav']} ${tableNav['tables-nav__item']} nav-item`}
              role='presentation'
            >
              <Button
                className={`${tableNav['tables-nav__link']} nav-link active`}
              >
                Привлеченные клиенты
              </Button>
            </li>
            <li
              className={` ${tableNav['tables-nav__item']} nav-item`}
              role='presentation'
            >
              <Button className={`${tableNav['tables-nav__link']} nav-link`}>
                История транзакций
              </Button>
            </li>
          </ul>
          <div
            className={` ${tableNav['tables__tabs']} ${tableNav['tab-content']}  row`}
            id='pills-tabContent'
          >
            <section
              className={` ${tables['tables__tab']} ${tables['tab-pane']} fade show active`}
              id='pills-attractedClients'
              role='tabpanel'
              aria-labelledby='pills-attractedClients-tab'
            >
              <div className={`${table['table-responsive']}`}>
                <table className={`${table['table']}`}>
                  <thead>
                    <tr>
                      <th>
                        <div className={`${table['table__head']}`}>Логин</div>
                      </th>
                      <th>
                        <div className={`${table['table__head']}`}>
                          Дата регистрации
                        </div>
                      </th>
                      <th>
                        <div className={`${table['table__head']}`}>Процент</div>
                      </th>
                      <th>
                        <div className={`${table['table__head']}`}>Платежи</div>
                      </th>
                      <th>
                        <div className={`${table['table__head']}`}>Прибыль</div>
                      </th>
                      <th>
                        <div className={`${table['table__head']}`}>Статус</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className={`${table['table__item']}`}>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className={`${table['table__item']}`}>
                          10.10.22
                        </div>
                      </td>
                      <td>
                        <div className={`${table['table__item']}`}>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className={`${table['table__item']}`}>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className={`${table['table__item']}`}>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className={`${table['table__wait']}`}>
                        <div className={`${table['table__item']}`}>
                          Ожидается
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </Container>
      </section>

      <section className={`${banners['banners']}`}>
        <Container>
          <h2 className='title'>Баннеры</h2>
          <div className={`${banners['banners__body']} row`}>
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
          </div>
        </Container>
      </section>

      <section className={`${banners['banners']} ${banners['presentations']}`}>
        <Container>
          <h2 className='title'>Презентации</h2>
          <div className={`${banners['banners__body']} row`}>
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
          </div>
        </Container>
      </section>
    </>
  )
}
