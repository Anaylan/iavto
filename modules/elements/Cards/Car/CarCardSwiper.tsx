import { URL_IMG } from 'app/config'
import slider from 'assets/sass/components/car/car-slider.module.scss'
import car from 'assets/sass/components/car/car.module.scss'
import Image from 'next/image'
import React, { useState } from 'react'

// Import Swiper React components
import { EffectFade, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

interface ICarCardSwiper {
  images: string[]
  cid: number | undefined
}

export const CarCardSwiper: React.FC<ICarCardSwiper> = ({ images, cid }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div className={car['car__slider-body']}>
      <Swiper
        modules={[EffectFade, Thumbs]}
        // spaceBetween={10}
        wrapperClass={slider['car-slider__wrapper']}
        // containerModifierClass={`${slider['car-slider']}`}
        // slideClass={slider['car-slider__slide']}
        effect='fade'
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        className={slider['car-slider']}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={slider['car-slider__slide']}>
            <div className={slider['car-slider__img']}>
              <Image
                sizes={'100%'}
                src={URL_IMG + '/' + cid + '/' + image}
                fill
                alt='изображение автомобиля'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs]}
        slidesPerView={4}
        onSwiper={setThumbsSwiper}
        wrapperClass={slider['car-mini-slider__wrapper']}
        className={slider['car-mini-slider']}
        spaceBetween={12}
        breakpoints={{
          1024: {
            spaceBetween: 25
          }
        }}

        // slideVisibleClass={slider['car-mini-slider-visible']}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={slider['car-mini-slider__slide']}>
            <div className={slider['car-mini-slider__img']}>
              <Image
                sizes={'100%'}
                src={URL_IMG + '/' + cid + '/' + image}
                fill
                alt='изображение автомобиля'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
