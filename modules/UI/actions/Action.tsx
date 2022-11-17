import { Heart } from 'assets/icon/icons'

export const ActionFollow = () => {
  return (
    <>
      <div className={'carpark-intro__action'}>
        <button className={'carpark-intro__action-btn'} type='button'>
          <div className={'icon'}>
            <Heart color={'icon__item'} />
          </div>
        </button>
      </div>
    </>
  )
}
