import { TITLE } from 'app/config';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Button, Pagination, PaginationItem } from 'modules/UI';

// import verif from 'assets/sass/'
import { Download } from 'assets/icon/icons';
// import { RentWidget } from 'modules/elements/widgets/RentWidget'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IRefModel, UserDataModel, UserModel } from 'app/models';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByToken } from 'api/User';
import { useRouter } from 'next/router';
import * as auth from 'app/redux/reducers/authReducer';
import { TCell, THead } from 'modules/UI/tables/table';
import { getAllReferer, getAllRefCompany } from 'api/Refferal';
import { dbFormatDate, month, RefCodeToClipboard } from 'libs/functions';
import { PartnershipTable } from 'modules/elements/partnership/PartnershipTable';

const THeadReferrals = [
  'Водитель',
  'Дата регистрации',
  'Процент',
  'Платежи',
  'Прибыль',
  'Статус',
];

const THeadCompanies = [
  'Автопарк',
  'Дата регистрации',
  'Процент',
  'Платежи',
  'Прибыль',
  'Статус',
];

const RentWidget = dynamic(
  () => {
    return import('modules/elements/widgets/RentWidget');
  },
  { ssr: false },
);

const ConversionWidget = dynamic(
  () => {
    return import('modules/elements/widgets/ConversionWidget');
  },
  { ssr: false },
);

export default function Partners() {
  const dispatch = useDispatch();
  const [referrals, setReferrals] = useState<IRefModel[]>([]);
  const [refCompanies, setRefCompanies] = useState<IRefModel[]>([]);
  const router = useRouter();
  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );
  useEffect(() => {
    getUserByToken()
      .then(({ data }: { data: UserModel }) => {
        if (data.status === 403) {
          router.push('/auth/signin');
        }
        if (user.id !== data.data?.id) {
          dispatch(auth.actions.logout());
        }
      })
      .catch((err) => {
        dispatch(auth.actions.logout());

        router.push('/auth/signin');
      });
  }, [user, dispatch, router]);

  useEffect(() => {
    getAllReferer().then(({ data }: { data: IRefModel[] }) => {
      setReferrals(data);
    });
    getAllRefCompany().then(({ data }: { data: IRefModel[] }) => {
      setRefCompanies(data);
      console.log(data);
    });
  }, []);
  console.log(referrals);

  return (
    <>
      <Head>
        <title>Партнёры | {TITLE}</title>
      </Head>
      <section className='charts'>
        <Container>
          <span className={'d-flex mb-4 align-items-end'}>
            <h1 className='title mb-0'>Информация о партнерстве</h1>
            <p
              onClick={() => {
                RefCodeToClipboard(user.id);
              }}
              className='text-indigo ms-1 pb-2 user-select-none'>
              (реферальная ссылка) нажмите чтобы скопировать
            </p>
          </span>

          <Row>
            <Col xs={12} lg={6}>
              <RentWidget className='' chartColor='black' chartHeight='30px' />
            </Col>
            <Col xs={12} lg={6}>
              <ConversionWidget
                className=''
                chartColor='black'
                chartHeight='30px'
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`tables`}>
        {/* Вёстку не меняй здесь, разбирайся со своими стилями!!!!!!!! */}
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Container>
            <Nav variant='pills' className='gap-3 mb-4'>
              <Nav.Item>
                <Nav.Link
                  className='tables-nav__link btn-main nav-link'
                  eventKey='first'>
                  Люди
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='tables-nav__link btn-main nav-link'
                  eventKey='second'>
                  Не люди
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
          <Container>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <PartnershipTable
                  referrals={referrals}
                  THeadRow={THeadReferrals}
                />
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <PartnershipTable
                  referrals={refCompanies}
                  THeadRow={THeadCompanies}
                />
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Tab.Container>
      </section>

      <section className={`banners`}>
        <Container>
          <h2 className='title'>Баннеры</h2>
          <Row className={`banners__body`}>
            <Col className={`banners__col`} xs={12} sm={6} md={3}>
              <a className={`banners__item`} href='#'>
                <span className={`banners__img-wrap`}>
                  <span className={`banners__img banners__img_long`}>
                    <Image
                      width={100}
                      height={100}
                      sizes='100%'
                      src='/media/banners/long/01.png'
                      alt=''
                    />
                  </span>
                  <span className={`banners__hover banners-hover`}>
                    <span className={`banners-hover__body`}>
                      <span className={`banners-hover__title`}>
                        Скачать баннер
                      </span>
                      <span className={`icon`}>
                        <Download />
                      </span>
                    </span>
                  </span>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`banners presentations`}>
        <Container>
          <h2 className='title'>Презентации</h2>
          <Row className={`banners__body`}>
            <Col className={`banners__col`} xs={12} sm={6} md={4}>
              <a className={`banners__item`} href='#'>
                <span className={`banners__img-wrap banners__img-wrap_shadow`}>
                  <span className={`banners__img`}>
                    <Image
                      width={100}
                      height={100}
                      sizes='100%'
                      src='/media/presentations/01.png'
                      alt=''
                    />
                  </span>
                  <span className={`banners__hover banners-hover`}>
                    <span className={`banners-hover__body`}>
                      <span className={`banners-hover__title`}>
                        Скачать презентацию
                      </span>
                      <span className={`icon`}>
                        <Download />
                      </span>
                    </span>
                  </span>
                </span>
                <span className={`banners__link-wrap`}>
                  <span className={`profile-body__action`}>
                    Скачать презентацию для автопарков
                  </span>
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
