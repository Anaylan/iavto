import { getHotTender, getLastTender } from 'api/Company'
import { TITLE } from 'app/config'
import { IHome } from 'app/models'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { SearchBlock, SearchItem, PriceFromTo } from 'modules/templates'
import CarParkBlock from 'modules/templates/CarParkBlock'
import NewsBlock from 'modules/templates/NewsBlock'
import { Container } from 'react-bootstrap'
import {
  SearchMainRow,
  SearchAdditonalRow,
  SearchAdditionalCol,
  SearchSelectOption,
  SearchSelect,
  Button,
  FilterInput
} from 'modules/UI'
import { useFormik } from 'formik'
import { getCarFilters } from 'api/Filter'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

interface IMark {
  mark: string
}

interface IModel {
  model: string
}

const DynamicCarParkBlock = dynamic(
  () => import('modules/templates/CarParkBlock')
)

const Home: NextPage<IHome> = () => {
  const [marks, setMark] = useState<IMark[]>([])
  const [models, setModel] = useState<IModel[]>([])
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      checked: [],
      mark: '',
      transmission: '',
      model: ''
    },
    onSubmit: (values) => {
      router.push({
        pathname: '/car',
        query: values
      })
    }
  })

  useEffect(() => {
    getCarFilters({
      getcell: 'model',
      mark: formik.values.mark
    }).then(({ data }: { data: IModel[] }) => {
      setModel(data)
    })
  }, [formik.values.mark])

  useEffect(() => {
    getCarFilters({
      getcell: 'mark'
    }).then(({ data }: { data: IMark[] }) => {
      setMark(data)
    })
  }, [])

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name='description' content='Поменять' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <CarParkBlock
        title={'Лучшие автопарки'}
        columns={{
          md: 3,
          xs: 12
        }}
        getData={getHotTender}
        large={true}
      />
      <section className='search'>
        <Container>
          <SearchBlock
            title='Поиск автомобилей'
            subtitle='Более 10 800 проверенных автомобилей'
            onSubmit={formik.handleSubmit}
          >
            <SearchMainRow>
              <SearchItem
                columns={{
                  xs: 12,
                  sm: 6,
                  md: 4
                }}
              >
                <SearchSelect
                  name='mark'
                  defaultValue={''}
                  onChange={formik.handleChange}
                >
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
                  md: 4
                }}
              >
                <SearchSelect
                  name='model'
                  defaultValue={''}
                  onChange={formik.handleChange}
                  disabled={false}
                >
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
                  sm: 5,
                  md: 4
                }}
              >
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
                  md: 12
                }}
                className={'justify-content-between d-flex'}
              >
                <Button type='submit'>Потвердить</Button>
                <Button onClick={formik.handleReset}>Сбросить</Button>
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
          lg: '1-5'
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
          lg: '1-5'
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
  )
}

export default Home
//         ____
//        /    \
//       /  |    \
//      /   |     \
//     |    |      |
//     |  --+--    |
//     |    |      |
//     |    |      |
//      \   |     /
//       \       /
//        \     /
//         \   /
//          \ /
