import action from 'assets/sass/components/carpark/carpark-intro__action.module.scss'
import { Heart } from 'assets/icon/icons'
import React from 'react'
import main from 'assets/sass/components/carpark/carpark-main.module.scss'

export const ActionFollow = () => {
  return (
    <>
      <div className={action['carpark-intro__action']}>
        <button className={action['carpark-intro__action-btn']} type='button'>
          <div className={action['icon']}>
            <Heart color={action['icon__item']} />
          </div>
        </button>
      </div>
    </>
  )
}
