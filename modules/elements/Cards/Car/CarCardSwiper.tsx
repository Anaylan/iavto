import { URL_IMG } from 'app/config';
import Image from 'next/image';
import React, { useState } from 'react';

// Import Swiper React components
import { EffectFade, Thumbs, Virtual, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/virtual';
import 'swiper/css/thumbs';

interface ICarCardSwiper {
  images: string[];
  cid: number | undefined;
}

export const CarCardSwiper: React.FC<ICarCardSwiper> = ({ images, cid }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  /**
   * Если эти "чудные" слайдеры опять сломаются - у свайпера уберите ВСЕ свойства
   * и вставляйте по одному пока не найдете сломанное"
   */

  return (
    <div className={'car__slider-body'}>
      <Swiper
        modules={[EffectFade, Thumbs, Virtual]}
        effect='fade'
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className={'car-slider'}
        virtual={typeof window !== 'undefined' ? false : true}>
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            virtualIndex={index}
            className={'car-slider__slide'}>
            <div className={'car-slider__img'}>
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
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        className={'car-mini-slider'}
        spaceBetween={12}
        breakpoints={{
          1024: {
            spaceBetween: 25,
          },
        }}>
        {images.map((image, index) => (
          <SwiperSlide key={index} className={'car-mini-slider__slide'}>
            <div className={'car-mini-slider__img'}>
              <Image
                sizes={'100%'}
                src={URL_IMG + '/' + cid + '/' + image}
                width={100}
                height={100}
                alt='изображение автомобиля'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
