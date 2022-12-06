import { TITLE } from 'app/config';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';

// import verif from 'assets/sass/'
import { Download, Copy, FolderDownload } from 'assets/icon/icons';
// import { RentWidget } from 'modules/elements/widgets/RentWidget'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IRefModel, UserDataModel, UserModel } from 'app/models';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByToken } from 'api/User';
import { useRouter } from 'next/router';
import { getAllReferer, getAllRefCompany } from 'api/Refferal';
import { RefCodeToClipboard } from 'libs/functions';
import { PartnershipTable } from 'modules/elements/partnership/PartnershipTable';
import * as auth from 'app/redux/reducers/authReducer';
import { Button, FormInputWithoutLabel } from 'modules/UI';
import { Modal } from 'react-bootstrap';
import {
  requestTransactionOutput,
  requestURLTransaction,
} from 'api/Transaction';

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
  const [balance, setBalance] = useState();
  const [status, setStatus] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [modalState, setModalState] = useState({
    show: false,
    output: '',
    token: '',
    // status: '',
    // message: '',
  });
  const handleCloseModal = () => {
    setModalState({ ...modalState, show: false });
    setStatus('');
    setMessage('');
  };

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
        setBalance(user.partners_balance);
      })
      .catch(() => {
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
    });
  }, []);

  const outputMoney = () => {
    if (balance) {
      if (Number(balance) >= Number(modalState.output)) {
        requestURLTransaction(modalState.output)
          .then(({ data }) => {
            setModalState({ ...modalState, token: data.token });
          })
          .catch(() => {});

        requestTransactionOutput(modalState.output, modalState.token)
          .then(({ data }) => {
            setMessage(data.message);
            setStatus(data.status);
          })
          .catch(() => {});
      } else {
        setMessage('На вашем счете не достаточно средств');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Партнёрство | {TITLE}</title>
      </Head>
      <section className='charts'>
        <Container>
          <div className={'charts__header'}>
            <h1 className='title'>Информация о партнерстве</h1>
            <div className='d-flex align-items-stretch'>
              <button
                onClick={() => {
                  RefCodeToClipboard(user.id);
                }}
                className='btn-main btn-ref'
                type='button'>
                <div className='d-flex align-items-center'>
                  <div className={`icon`}>
                    <Copy />
                  </div>
                  <span>Реферальная ссылка (нажмите, чтобы скопировать)</span>
                </div>
              </button>
              <Button
                onClick={() => setModalState({ ...modalState, show: true })}
                className='ms-3'>
                Вывод средств
              </Button>
            </div>
          </div>

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
                  Водители
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className='tables-nav__link btn-main nav-link'
                  eventKey='second'>
                  Автопарки
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

      <section className={`referal-media`}>
        <Container>
          <h2 className='title'>Материалы для рекламы</h2>
          <div className={`referal-media__body`}>
            <div className={`referal-media__col`}>
              <a
                className={`referal-media__item`}
                href='https://disk.yandex.ru/d/SSKiNnbAcvqpPw/%D0%91%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D1%8B'
                target='_blank'
                rel='noreferrer'>
                <span className={`icon`}>
                  <FolderDownload />
                </span>
                <span className={`referal-media__link-wrap`}>
                  <span className={`referal-media__link`}>Баннеры</span>
                </span>
              </a>
            </div>
            <div className={`referal-media__col`}>
              <a
                className={`referal-media__item`}
                href='https://disk.yandex.ru/d/SSKiNnbAcvqpPw/%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%20%D0%AF%D0%90%D0%92%D0%A2%D0%9E.%D0%A0%D0%A4'
                target='_blank'
                rel='noreferrer'>
                <span className={`icon`}>
                  <FolderDownload />
                </span>
                <span className={`referal-media__link-wrap`}>
                  <span className={`referal-media__link`}>Видео ЯАВТО.РФ</span>
                </span>
              </a>
            </div>
            <div className={`referal-media__col`}>
              <a
                className={`referal-media__item`}
                href='https://disk.yandex.ru/d/SSKiNnbAcvqpPw/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%B8%20'
                target='_blank'
                rel='noreferrer'>
                <span className={`icon`}>
                  <FolderDownload />
                </span>
                <span className={`referal-media__link-wrap`}>
                  <span className={`referal-media__link`}>Презентации</span>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>
      <Modal centered show={modalState.show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Вывод средств</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status != '200' && (
            <p className='mb-4 text-center'>
              Ваш текущий баланс: {balance} рублей
            </p>
          )}
          {status != '200' && (
            <FormInputWithoutLabel
              onChange={(e) => {
                setModalState({ ...modalState, output: e.target.value });
              }}
              value={modalState.output}
              placeholder='Введите сумму вывода'
              className='mb-3 form-control'
              type={'number'}
            />
          )}
          {message && <p>{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          {status != '200' && <Button onClick={outputMoney}>Вывести</Button>}
          <Button className='btn-main-trp' onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
