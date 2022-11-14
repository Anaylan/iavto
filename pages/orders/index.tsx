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
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      mark: '',
      model: '',
      tarif: '',
      from: '',
      to: '',
    },
    onSubmit: (values) => {
      // console.log(values)
      router.push({
        pathname: '/orders',
        query: values,
      });
      setTimeout(() => {
        window.location.reload();
      }, 25);
    },
  });

  useEffect(() => {
    if (formik.values.mark) {
      getCarFilters({
        getcell: 'model',
        wherecell: 'mark',
        where: formik.values.mark,
      }).then(({ data }: { data: IModel[] }) => {
        setModel(data);
      });
    } else {
      getCarFilters({
        getcell: 'model',
      }).then(({ data }: { data: IModel[] }) => {
        setModel(data);
      });
    }
  }, [formik.values.mark]);

  useEffect(() => {
    getCarFilters({
      getcell: 'mark',
    }).then(({ data }: { data: IMark[] }) => {
      setMark(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Мои заказы | {TITLE}</title>
      </Head>
      <section className='search search-min'>
        <Container>
          <Row>
            <Container>
              <SearchBlock
                title='Поиск автомобилей по параметрам'
                onSubmit={formik.handleSubmit}>
                <SearchMainRow>
                  <SearchItem
                    columns={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <SearchSelect
                      name='tarif'
                      defaultValue={''}
                      onChange={formik.handleChange}>
                      <SearchSelectOption value={''} disabled={true}>
                        Выберите тариф
                      </SearchSelectOption>
                      {tarifs &&
                        tarifs.map((tarif, key) => (
                          <SearchSelectOption key={key} value={tarif.name}>
                            {tarif.name}
                          </SearchSelectOption>
                        ))}
                    </SearchSelect>
                  </SearchItem>
                  <SearchItem
                    columns={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <SearchSelect
                      name='mark'
                      defaultValue={''}
                      onChange={formik.handleChange}>
                      <SearchSelectOption value={''} disabled={true}>
                        Выберите марку
                      </SearchSelectOption>
                      {marks &&
                        marks.map((mark, key) => (
                          <SearchSelectOption key={key} value={mark.mark}>
                            {mark.mark}
                          </SearchSelectOption>
                        ))}
                    </SearchSelect>
                  </SearchItem>
                  <SearchItem
                    columns={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <SearchSelect
                      name='model'
                      defaultValue={''}
                      onChange={formik.handleChange}
                      disabled={false}>
                      <SearchSelectOption value={''} disabled={true}>
                        Выберите модель
                      </SearchSelectOption>
                      {models &&
                        models.map((model, key) => (
                          <SearchSelectOption key={key} value={model.model}>
                            {model.model}
                          </SearchSelectOption>
                        ))}
                    </SearchSelect>
                  </SearchItem>
                  <SearchItem
                    columns={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <SearchSelect
                      name='status'
                      defaultValue={''}
                      onChange={formik.handleChange}
                      disabled={false}>
                      <SearchSelectOption value={''} disabled={true}>
                        Статус
                      </SearchSelectOption>
                      {statuses &&
                        statuses.map((status, key) => (
                          <SearchSelectOption key={key} value={status.name}>
                            {status.name}
                          </SearchSelectOption>
                        ))}
                    </SearchSelect>
                  </SearchItem>
                  <SearchAdditionalCol
                    columns={{
                      xs: 12,
                      sm: 6,
                      md: 5,
                    }}>
                    <PriceFromTo>
                      <FilterInput
                        name='from'
                        onChange={formik.handleChange}
                        type='number'
                        placeholder='От'
                      />
                      <span></span>
                      <FilterInput
                        name='to'
                        onChange={formik.handleChange}
                        type='number'
                        placeholder='До'
                      />
                    </PriceFromTo>
                  </SearchAdditionalCol>
                </SearchMainRow>
                <SearchAdditonalRow>
                  <SearchAdditionalCol
                    columns={{
                      xs: 12,
                      sm: 12,
                      md: 12,
                    }}
                    className={
                      'justify-content-between d-flex flex-row-reverse'
                    }>
                    <Button type='submit'>Потвердить</Button>
                  </SearchAdditionalCol>
                </SearchAdditonalRow>
              </SearchBlock>
            </Container>
            {/* <SearchBodyOrders/> */}
            <section className='cars orders'>
              <div className='container'>
                <h1 className='cars__title title title-center'>Сентябрь</h1>
                <Row>
                  {orders &&
                    orders.map((order, key) => (
                      <Fragment key={key}>
                        <OrderCard order={order} />
                      </Fragment>
                    ))}
                </Row>
              </div>
            </section>
          </Row>
        </Container>
      </section>
    </>
  );
}
