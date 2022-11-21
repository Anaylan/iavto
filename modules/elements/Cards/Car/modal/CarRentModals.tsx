import { Modal } from 'react-bootstrap';
import { Button } from 'modules/UI';
import { useRouter } from 'next/router';
import { FormInputWithoutLabel } from 'modules/UI';
import { useState } from 'react';
import { requestTransaction, requestURLTransaction } from 'api/Transaction';

export const CarRentModal = ({
  show,
  setShow,
  status,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  status: number;
}) => {
  const handleClose = () => {
    setShow(false);
  };
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const [showPay, setShowPay] = useState(false);
  const handleClosePay = () => setShowPay(false);
  const [token, setToken] = useState<string>('');
  const [showCheck, setShowCheck] = useState(false);
  const handleShowCheck = () => setShowCheck(true);
  const handleCloseCheck = () => setShowCheck(false);

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
    <>
      {status == -1 && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Авторизуйтесь</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form'>
            <Button
              onClick={() => {
                handleClose;
                router.push('/auth/signin');
              }}>
              Авторизоваться
            </Button>
            <Button className={'ms-2 btn-main-trp'} onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Body>
        </Modal>
      )}
      {status == 0 && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Автомобиль не доступен для аренды</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form'>
            <Button className={'btn-main-trp'} onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Body>
        </Modal>
      )}
      {status == 1 && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Аккаунт не верифицирован</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form'>
            <Button
              onClick={() => {
                router.push('/profile/edit');
              }}>
              Верифицировать аккаунт
            </Button>
            <Button className={'ms-2 btn-main-trp'} onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Body>
        </Modal>
      )}
      {status == 2 && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>На вашем счете не достаточно средств</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form'>
            <Button
              onClick={() => {
                setShowPay(true);
                handleClose();
              }}>
              Пополнить
            </Button>
            <Button className={'ms-2 btn-main-trp'} onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Body>
        </Modal>
      )}
      {status == 3 && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ваш заказ находится в обработке</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form'>
            <p>Вы можете посмотреть дату заказа в разделе Мои заказы</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className={'btn-main-trp'} onClick={handleClose}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      )}
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
    </>
  );
};
