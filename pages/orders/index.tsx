// import { SearchBlock } from 'modules/templates'
import { Container, Row } from 'react-bootstrap';
import { TITLE } from 'app/config';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { getUserOrders } from 'api/Orders';
import { OrderCard } from 'modules/elements';
import { IOrderModel } from 'app/models/order/Order';
import { SearchBlock, SearchItem, PriceFromTo } from 'modules/templates';
import {
  SearchMainRow,
  SearchAdditonalRow,
  SearchAdditionalCol,
  SearchSelectOption,
  SearchSelect,
  Button,
  FilterInput,
} from 'modules/UI';
import {
  FilterRadioGroup,
  FilterRadioItem,
} from 'modules/UI/radio/FilterRadio';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { getCarFilters } from 'api/Filter';

interface IMark {
  mark: string;
}

interface IModel {
  model: string;
}

const tarifs = [
  { name: 'Эконом' },
  { name: 'Комфорт' },
  { name: 'Комфорт +' },
  { name: 'Минивэн' },
  { name: 'Business' },
  { name: 'Premier' },
  { name: 'Élite' },
  { name: 'Cruise' },
];

const statuses = [
  { name: 'Одобрено' },
  { name: 'Ожидается' },
  { name: 'Отклонено' },
];

export default function Orders() {
  const [orders, setOrders] = useState<IOrderModel[]>();
  const [marks, setMark] = useState<IMark[]>([]);
  const [models, setModel] = useState<IModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    getUserOrders(router.query).then(({ data }: { data: IOrderModel[] }) => {
      setOrders(data);
      console.log(data);
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>Мои заказы | {TITLE}</title>
      </Head>
      <Container>
        <Row>
          {/* <SearchBodyOrders/> */}
          <section className='cars orders'>
            <h1 className='title'>Мои заказы</h1>
            <Row>
              {orders &&
                orders.map((order, key) => (
                  <Fragment key={key}>
                    <OrderCard order={order} />
                  </Fragment>
                ))}
            </Row>
          </section>
        </Row>
      </Container>
    </>
  );
}
