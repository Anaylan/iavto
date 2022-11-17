import { URL_IMG } from 'app/config';
import { UserDataModel } from 'app/models';
import * as auth from 'app/redux/reducers/authReducer';
import { Notification, Settings, Support } from 'assets/icon/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Textarea, Button, FormInputWithoutLabel } from 'modules/UI';
import { Modal } from 'react-bootstrap';
import { requestTransaction, requestURLTransaction } from 'api/Transaction';
import { requestEdit } from 'api/User';
// import Modal from '@restart/ui/Modal';
enum TypeFavorites {
  car = 1,
  carpark = 0,
}

interface IProfile {
  profile: UserDataModel;
}

interface IProfileFavorites {
  data?: number;
  params?: string;
  type: TypeFavorites;
}

export const ProfileCard: FC<IProfile> = ({ profile }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = () => {
    dispatch(auth.actions.logout());
    router.push('/');
  };
  return (
    <>
      <Col md={6} xs={12} className={'profile__col'}>
        <div className={'profile__item'}>
          <div className={`profile__top profile-top`}>
            <div className={'profile-top__row'}>
              <div className={'profile-top__photo'}>
                <Image
                  src={URL_IMG + 'users/' + profile.avatar}
                  fill
                  alt={profile.firstname}
                />
              </div>
              <div className={'profile-top__main'}>
                <h1 className={'profile-top__title'}>
                  {profile.firstname} {profile.lastname}
                </h1>
                <a
                  className={'profile-top__tel'}
                  href={`tel:${profile.telephone}`}>
                  {profile.telephone}
                </a>
              </div>
              <a className={'profile-top__btn'} href='#'>
                <div className={'icon'}>
                  <Notification />
                </div>
                <span className={'profile-top__btn-bullet'}></span>
              </a>
            </div>
          </div>
          <div className={'profile-bottom'}>
            <button className={'profile-body__action'} type='button'></button>
            <button onClick={logout} className={'profile-body__action'}>
              Выйти
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};

export const ProfileDescription = ({
  description,
}: {
  description: string | undefined;
}) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [prevDescr, setPrevDescr] = useState('');

  const handleClose = () => {
    requestEdit({ prevDescr }).then(({ data }) => {
      console.log(data);
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Col md={6} xs={12} className={'profile__col'}>
        <div className={'profile__item'}>
          <div className={`profile__body profile-body`}>
            <div className={'profile-body__top'}>
              <h3 className={'profile-body__title'}>Информация о себе</h3>
              <button
                className={'profile-body__action'}
                type='button'
                onClick={handleShow}>
                Редактировать
              </button>
            </div>
            <div className={'profile-body__about'}>
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Изменение информации о себе</Modal.Title>
                </Modal.Header>
                <Modal.Body className='form'>
                  <Textarea
                    defaultValue={description}
                    className='mb-3 form__input'
                    onChange={(e) => {
                      setPrevDescr(e.target.value);
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button className={'btn-main-trp'} onClick={handleClose}>
                    Закрыть
                  </Button>
                  <Button onClick={handleClose}>Сохранить</Button>
                </Modal.Footer>
              </Modal>
              <p>{description ? description : 'Заполните информацию о себе'}</p>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export const ProfileBalance = ({
  balance,
}: {
  balance: string | undefined;
}) => {
  const [value, setValue] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [showPay, setShowPay] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleClosePay = () => setShowPay(false);
  const handleShowPay = () => setShowPay(true);

  const handleCloseCheck = () => setShowCheck(false);
  const handleShowCheck = () => setShowCheck(true);

  const addMoney = () => {
    requestURLTransaction(value).then(({ data }) => {
      window.open(data.src);
      setToken(data.token);
      handleClosePay();
      handleShowCheck();
    });
  };

  const checkPayment = () => {
    requestTransaction(value, token).then(({ data }) => {
      handleCloseCheck();
      setToken('');
      setValue('');
      console.log(data);
    });
  };

  return (
    <Col sx={12} sm={6} md={3} className={'profile__col'}>
      <Link href='#' className={`profile__item profile__item_imp`}>
        <div className={`profile__body profile-body`}>
          <h3 className={'profile-body__title'}>Баланс</h3>
        </div>
        <div className={`profile__bottom profile-bottom`}>
          <div className={'profile__subtitle'}>
            <span>{balance ? balance : 0}</span>₽
          </div>
          <div onClick={handleShowPay} className={'profile-body__action'}>
            Пополнить
          </div>
        </div>
      </Link>
      <Modal centered show={showPay} onHide={handleClosePay}>
        <Modal.Header closeButton>
          <Modal.Title>Пополнение счёта</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInputWithoutLabel
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            placeholder='Введите сумму пополнения'
            className='mb-3 form-control'
            type={'number'}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className={'btn-main-trp'} onClick={handleClosePay}>
            Закрыть
          </Button>
          <Button onClick={addMoney}>Пополнить</Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={showCheck}>
        <Modal.Header>
          <Modal.Title>Пополнение счёта</Modal.Title>
        </Modal.Header>
        <Modal.Body>Оплатите счет и нажмите кнопку проверить</Modal.Body>
        <Modal.Footer>
          <Button onClick={checkPayment}>Проверить</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export const ProfileParthners = ({
  balance,
}: {
  balance: string | undefined;
}) => {
  return (
    <Col x={12} sm={6} md={3} className={'profile__col'}>
      <Link className={`profile__item profile__item_imp`} href='/partnership'>
        <div className={`profile__body profile-body`}>
          <h3 className={'profile-body__title'}>Партнерство</h3>
        </div>
        <div className={`profile__bottom profile-bottom`}>
          <div className={'profile__subtitle'}>
            <span>{balance ? balance : 0}</span>₽
          </div>
          <div className={'profile-body__action'}>Просмотр</div>
        </div>
      </Link>
    </Col>
  );
};

export const ProfileFavorites: FC<IProfileFavorites> = ({
  type,
  data,
  params,
}) => {
  return (
    <Col xs={12} md={6} className={'profile__col'}>
      <Link className={'profile__item'} href={'#'}>
        <div className={`profile__body'} profile-body`}>
          <h3 className={'profile-body__title'}>
            Избранное: <span>{type ? 'Автомобили' : 'Автопарков'}</span>
          </h3>
        </div>
        <div className={`profile__bottom'} profile-bottom`}>
          <div className={'profile__subtitle'}>
            <span>{data}</span>
            {type ? 'автомобилей' : 'автопарков'}
          </div>
        </div>
      </Link>
    </Col>
  );
};

export const ProfileOrders = ({ data }: { data: number }) => {
  return (
    <Col xs={12} sm={6} md={3} className={'profile__col'}>
      <Link className={'profile__item'} href='/orders'>
        <div className={`profile__body profile-body`}>
          <h3 className={'profile-body__title'}>Мои заказы</h3>
        </div>
        <div className={`profile__bottom profile-bottom`}>
          <div className={'profile__subtitle'}>
            <span className={'profile__value'}>{data}</span>завершенных заказов
          </div>
        </div>
      </Link>
    </Col>
  );
};

export const ProfileReviews = ({ data }: { data: number }) => {
  return (
    <>
      <Col xs={12} sm={6} md={3} className={'profile__col'}>
        <Link className={'profile__item'} href='/reviews'>
          <div className={'profile__body profile-body'}>
            <h3 className={'profile-body__title'}>Мои отзывы</h3>
          </div>
          <div className={'profile__bottom profile-bottom'}>
            <div className={'profile__subtitle'}>
              <span className={'profile__value'}>{data}</span>отзывов
            </div>
          </div>
        </Link>
      </Col>
    </>
  );
};

export const ProfileSettings = () => {
  return (
    <Col xs={12} sm={6} md={6} className={'profile__col'}>
      <Link className={` profile__item profile__item_dop`} href='/profile/edit'>
        <div className={`profile__body profile-body`}>
          <h3 className={'profile-body__title'}>
            <div className={'icon'}>
              <Settings />
            </div>
            Общие настройки
          </h3>
        </div>
      </Link>
    </Col>
  );
};

export const ProfileSupport = () => {
  return (
    <Col xs={12} sm={6} md={6} className={'profile__col'}>
      <Link className={` profile__item profile__item_dop`} href='/chat'>
        <div className={`profile__body profile-body`}>
          <h3 className={'profile-body__title'}>
            <div className={'icon'}>
              <Support />
            </div>
            Чат и поддержка
          </h3>
        </div>
      </Link>
    </Col>
  );
};
