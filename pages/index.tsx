import { getHotTender, getLastTender } from 'api/Company';
import { TITLE } from 'app/config';
import { IHome } from 'app/models';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { SearchBlock, SearchItem, PriceFromTo } from 'modules/templates';
import CarParkBlock from 'modules/templates/CarParkBlock';
import NewsBlock from 'modules/templates/NewsBlock';
import { Container } from 'react-bootstrap';
import {
  SearchMainRow,
  SearchAdditonalRow,
  SearchAdditionalCol,
  SearchSelectOption,
  SearchSelect,
  Button,
  FilterInput,
  FilterRadioGroup,
  FilterRadioItem,
} from 'modules/UI';
import { useFormik } from 'formik';
import { getCarFilters } from 'api/Filter';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Эконом
// Комфорт
// Комфорт +
// Минивэн
// Premier
// Élite
// Cruise
// Business

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

const DynamicCarParkBlock = dynamic(
  () => import('modules/templates/CarParkBlock'),
);

const Home: NextPage<IHome> = () => {
  const [marks, setMark] = useState<IMark[]>([]);
  const [models, setModel] = useState<IModel[]>([]);

  const [fuelChange, setFuelChange] = useState<number>(0);
  const [transChange, setTransChange] = useState<number>(0);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      mark: '',
      transmission: '',
      model: '',
      tarif: '',
      fuel_type: '',
      price_min: '',
      price_max: '',
    },
    onSubmit: (values) => {
      // console.log(values)
      router.push({
        pathname: '/car',
        query: values,
      });
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
        <title>{TITLE}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='ЯАВТО.РФ - Первая в мире площадка по аренде автомобилей в такси'
        />
        <meta
          name='keywords'
          content='аренда авто под такси,аренда машины,машина для такси'
        />
        <meta name='title' content='ЯАВТО.РФ - Площадка Аренды Автомобилей' />
      </Head>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12,
          sm: 6,
        }}
        getData={getHotTender}
        large={true}
      />
      <section className='search'>
        <Container>
          <SearchBlock
            title='Поиск автомобилей'
            subtitle='Множество проверенных автомобилей'
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
                  <SearchSelectOption value={''}>Все тарифы</SearchSelectOption>
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
                  <SearchSelectOption value={''}>Все марки</SearchSelectOption>
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
                  <SearchSelectOption value={''}>Все модели</SearchSelectOption>
                  {models &&
                    models.map((model, key) => (
                      <SearchSelectOption key={key} value={model.model}>
                        {model.model}
                      </SearchSelectOption>
                    ))}
                </SearchSelect>
              </SearchItem>
              <SearchAdditionalCol
                columns={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}>
                <PriceFromTo>
                  <FilterInput
                    name='price_min'
                    onChange={formik.handleChange}
                    type='number'
                    placeholder='От'
                  />
                  <span></span>
                  <FilterInput
                    name='price_max'
                    onChange={formik.handleChange}
                    type='number'
                    placeholder='До'
                  />
                </PriceFromTo>
              </SearchAdditionalCol>
              <SearchAdditionalCol
                columns={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}>
                <FilterRadioGroup>
                  <FilterRadioItem
                    onChange={formik.handleChange}
                    onClick={() => {
                      if (transChange === 1) {
                        setTransChange(0);
                        formik.values.transmission = '';
                      } else setTransChange(1);
                    }}
                    value={'auto'}
                    id='automatic'
                    name='transmission'
                    checked={transChange === 1}>
                    Автомат
                  </FilterRadioItem>
                  <FilterRadioItem
                    onChange={formik.handleChange}
                    onClick={() => {
                      if (transChange === 2) {
                        setTransChange(0);
                        formik.values.transmission = '';
                      } else setTransChange(2);
                    }}
                    id='mechanics'
                    value={'mechanics'}
                    name='transmission'
                    checked={transChange === 2}>
                    Механическая
                  </FilterRadioItem>
                </FilterRadioGroup>
              </SearchAdditionalCol>
              <SearchAdditionalCol
                columns={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}>
                <FilterRadioGroup>
                  <FilterRadioItem
                    name={'fuel_type'}
                    onChange={formik.handleChange}
                    onClick={() => {
                      if (fuelChange === 1) {
                        setFuelChange(0);
                        formik.values.fuel_type = '';
                      } else setFuelChange(1);
                    }}
                    id='petrol'
                    value='petrol'
                    checked={fuelChange === 1}>
                    Бензин
                  </FilterRadioItem>
                  <FilterRadioItem
                    name={'fuel'}
                    onChange={formik.handleChange}
                    onClick={() => {
                      if (fuelChange === 2) {
                        setFuelChange(0);
                        formik.values.fuel_type = '';
                      } else setFuelChange(2);
                    }}
                    id='disel'
                    value='disel'
                    checked={fuelChange === 2}>
                    Дизель
                  </FilterRadioItem>
                  <FilterRadioItem
                    name={'fuel'}
                    onChange={formik.handleChange}
                    onClick={() => {
                      if (fuelChange === 3) {
                        setFuelChange(0);
                        formik.values.fuel_type = '';
                      } else setFuelChange(3);
                    }}
                    id='gas'
                    value='gas'
                    checked={fuelChange === 3}>
                    Газ
                  </FilterRadioItem>
                </FilterRadioGroup>
              </SearchAdditionalCol>
            </SearchMainRow>
            <SearchAdditonalRow>
              <SearchAdditionalCol
                columns={{
                  xs: 12,
                  sm: 12,
                  md: 12,
                }}
                className={'justify-content-between d-flex flex-row-reverse'}>
                <Button type='submit'>Поиск</Button>
              </SearchAdditionalCol>
            </SearchAdditonalRow>
          </SearchBlock>
        </Container>
      </section>
      <DynamicCarParkBlock
        title={'Автопарки'}
        columns={{
          md: 3,
          xs: 12,
          sm: 6,
          lg: '1-5',
        }}
        getData={getLastTender}
        large={false}
      />
      <DynamicCarParkBlock
        title={'Новые автопарки'}
        columns={{
          md: 3,
          xs: 12,
          sm: 6,
          lg: '1-5',
        }}
        getData={getLastTender}
        large={false}
      />
      <section className='news'>
        <Container>
          <NewsBlock />
        </Container>
      </section>
      {/*       ______       */}
      {/*     /        \     */}
      {/*    /          \    */}
      {/*    |          |    */}
      {/*    |          |    */}
      {/*    +----------+    */}
      {/*    |          |    */}
      {/*     \        /     */}
      {/*      \      /      */}
      {/*       \    /       */}
      {/*        \  /        */}
      {/*         \/         */}
      {/*         ||         */}
      {/*        /  \        */}
      {/*        |  |        */}
      {/*        \  /        */}
      {/*         ++         */}
      {/* Куринное бёдрышко) */}
    </>
  );
};

export default Home;

//         ___
//        /   \
//       /  |  \
//      /   |   \
//     |    |    |
//     |  --+--  |
//     |    |    |
//     |    |    |
//      \   |   /
//       \     /
//        \___/
//
