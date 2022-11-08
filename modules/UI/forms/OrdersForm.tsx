import form from 'assets/sass/components/form.module.scss'
import { Row } from 'react-bootstrap'
// import { form } from 'modules/UI'

// Уже есть в modules/template/SearchBlock
// Убираешь все данные с формы ставишь пропсом children и добавляешь свои

const SearchBodyOrders = () => {
  return (
    <>
      <form className='search__form search-form ' method=''>
        <Row className='search-form__additional search-additional '>
          <div className='search-additional__item select-wrap col-12 col-sm-6 col-md-4'>
            <select className='search-additional__select search-form__input'>
              <option
                className='search-additional__option option-hide'
                disabled
                selected
              >
                Выберите тариф
              </option>
              <option className='search-additional__option' value=''>
                Эконом класс
              </option>
              <option className='search-additional__option' value=''>
                Комфорт
              </option>
              <option className='search-additional__option' value=''>
                Комфорт +
              </option>
              <option className='search-additional__option' value=''>
                Минивэн
              </option>
              <option className='search-additional__option' value=''>
                Business
              </option>
              <option className='search-additional__option' value=''>
                Premier
              </option>
              <option className='search-additional__option' value=''>
                Élite
              </option>
              <option className='search-additional__option' value=''>
                Cruise
              </option>
            </select>
          </div>
          <div className='search-additional__item select-wrap col-12 col-sm-6 col-md-4'>
            <select className='search-additional__select search-form__input'>
              <option
                className='search-additional__option option-hide'
                disabled
                selected
              >
                Выберете марку
              </option>
              <option className='search-additional__option' value=''>
                Марка 1
              </option>
              <option className='search-additional__option' value=''>
                Марка 2
              </option>
              <option className='search-additional__option' value=''>
                Марка 3
              </option>
            </select>
          </div>
          <div className='search-additional__item select-wrap col-12 col-sm-6 col-md-4'>
            <select className='search-additional__select search-form__input'>
              <option
                className=' search-additional__option option-hide'
                disabled
                selected
              >
                Выберете модель
              </option>
              <option className='search-additional__option' value=''>
                Модель 1
              </option>
              <option className='search-additional__option' value=''>
                Модель 2
              </option>
              <option className='search-additional__option' value=''>
                Модель 3
              </option>
            </select>
          </div>
          <div className='search-additional__item select-wrap col-12 col-sm-6 col-md-4'>
            <select className='search-additional__select search-form__input'>
              <option
                className='search-additional__option option-hide'
                disabled
                selected
              >
                Статус
              </option>
              <option className='search-additional__option' value=''>
                Статус 1
              </option>
              <option className='search-additional__option' value=''>
                Статус 2
              </option>
              <option className='search-additional__option' value=''>
                Статус 3
              </option>
            </select>
          </div>
          <div className='search-additional__item col-12 col-sm-6 col-md-5'>
            <div className='search-additional__price d-flex align-items-center'>
              <p>Цена:</p>
              <input
                className='search-form__input'
                type='number'
                placeholder='От'
              />
              <span></span>
              <input
                className='search-form__input'
                type='number'
                placeholder='До'
              />
            </div>
          </div>
          <div className='search-additional__item col-12 d-flex align-items-center justify-content-end'>
            <button className='search-form__btn btn-main'>
              Поиск по параметрам
            </button>
          </div>
        </Row>
      </form>
    </>
  )
}
