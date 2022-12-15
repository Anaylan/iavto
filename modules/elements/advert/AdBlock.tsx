import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper';

export enum ISizes {
  Big,
  Small,
}

const images = [
  {
    href: 'https://wa.me/79294009488',
    src: '/media/advertis/700х300.png',
  },
  {
    href: 'https://wa.me/79294009488',
    src: '/media/advertis/450х230.png',
  },
  {
    href: 'https://wa.me/79294009488',
    src: '/media/advertis/388х638.png',
  },
];

export const AdBlock = ({ size }: { size: ISizes }) => {
  return (
    <Fragment>
      <Swiper
        // navigation={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={15}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        className={'w-100 h-100'}>
        {size == ISizes.Big ? (
          <>
            {images.map((image) => (
              <SwiperSlide>
                <Link
                  className='post__banner-none position-relative'
                  target={'_blank'}
                  href={image.href}>
                  <Image
                    loading='lazy'
                    fill
                    sizes='100%'
                    alt='Реклама'
                    src={image.src}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </>
        ) : size == ISizes.Small ? (
          <>
            {images.map((image) => (
              <SwiperSlide>
                <Link
                  className='news__banner-none position-relative'
                  target={'_blank'}
                  href={image.href}>
                  <Image
                    loading='lazy'
                    fill
                    sizes='100%'
                    alt='Реклама'
                    src={image.src}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </>
        ) : null}
      </Swiper>
    </Fragment>
  );
};
