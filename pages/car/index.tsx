import { getCars } from 'api/Car';
import { getHotTender } from 'api/Company';
import { TITLE } from 'app/config';
// import CarBlock from 'modules/templates/CarBlock'
import CarParkBlock from 'modules/templates/CarParkBlock';
import Head from 'next/head';
import dynamic from 'next/dist/shared/lib/dynamic';
import { Container } from 'react-bootstrap';
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCarFilters } from 'api/Filter';
import { useFormik } from 'formik';
import {
  FilterRadioGroup,
  FilterRadioItem,
} from 'modules/UI/radio/FilterRadio';

const DynamicCarBlock = dynamic(() => import('modules/templates/CarBlock'), {
  suspense: true,
});

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

export default function Cars() {
  const [marks, setMark] = useState<IMark[]>([]);
  const [models, setModel] = useState<IModel[]>([]);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      mark: '',
      transmission: 'Автомат',
      model: '',
      tarif: '',
      fuel: 'Бензин',
      from: '',
      to: '',
    },
    onSubmit: (values) => {
      // console.log(values)
      router.push({
        pathname: '/car',
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
        <title>Машины | {TITLE}</title>
      </Head>
      <section className='search'>
        <Container>
          <SearchBlock
            title='Поиск автомобилей'
            subtitle='Более 10 800 проверенных автомобилей'
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
              <SearchAdditionalCol
                columns={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}>
                <FilterRadioGroup>
                  <FilterRadioItem
                    onChange={formik.handleChange}
                    value={'auto'}
                    id='automatic'
                    name='transmission'
                    defaultChecked={true}>
                    Автомат
                  </FilterRadioItem>
                  <FilterRadioItem
                    onChange={formik.handleChange}
                    id='mechanics'
                    value={'mechanics'}
                    name='transmission'
                    defaultChecked={false}>
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
                    name={'fuel'}
                    onChange={formik.handleChange}
                    id='petrol'
                    value='petrol'
                    defaultChecked={true}>
                    Бензин
                  </FilterRadioItem>
                  <FilterRadioItem
                    name={'fuel'}
                    onChange={formik.handleChange}
                    id='disel'
                    value='disel'
                    defaultChecked={false}>
                    Дизель
                  </FilterRadioItem>
                  <FilterRadioItem
                    name={'fuel'}
                    onChange={formik.handleChange}
                    id='gas'
                    value='gas'
                    defaultChecked={false}>
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
                <Button type='submit'>Потвердить</Button>
              </SearchAdditionalCol>
            </SearchAdditonalRow>
          </SearchBlock>
        </Container>
      </section>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12,
        }}
        getData={getHotTender}
        large={true}
      />
      <Container>
        <DynamicCarBlock title={'Автомобили'} getData={getCars} />
      </Container>
    </>
  );
}
// function fetchCars(arg0: number) {
//   throw new Error('Function not implemented.')
// }
