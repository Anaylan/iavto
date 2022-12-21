import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAdvertisment, viewAdvertisment, clickAdvertisment } from 'api/Advert';
import 'swiper/css';
import 'swiper/css/navigation';
import { IPlaces, IAdModel } from 'app/models';
import { Autoplay, Navigation } from 'swiper';
import { URL_IMG } from 'app/config';

export enum ISizes {
  Big,
  Small,
}

export const AdBlock = ({ size, type }: { size: ISizes; type: IPlaces }) => {
  const [ads, setAds] = useState<IAdModel[]>([]);

  useEffect(() => {
    getAdvertisment(type).then(({ data }: { data: IAdModel[] }) => {
      setAds(data);
    });
  }, []);

  useMemo(()=>{
    ads.map((advertisment) => {
      viewAdvertisment(advertisment.id)
    });
  }, [ads])
  return (
    <Fragment>
      {ads.length > 0 ? (
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
              {ads.map((banner, key) => (
                <SwiperSlide key={key}>
                  <Link
                    onClick={() => {
                      clickAdvertisment(banner.id)
                    }}
                    className='post__banner-none position-relative'
                    target={'_blank'}
                    href={banner.link || ''}>
                    <Image
                      loading='lazy'
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                      sizes='100%'
                      alt='Реклама'
                      src={URL_IMG + '/img/ads/' + banner.img}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </>
          ) : size == ISizes.Small ? (
            <>
              {ads.map((banner, key) => (
                <SwiperSlide key={key}>
                  <Link
                    onClick={() => {
                      clickAdvertisment(banner.id)
                    }}
                    className={'news__banner-none position-relative w-100'}
                    target={'_blank'}
                    href={banner.link}>
                    <Image
                      loading='lazy'
                      fill
                      quality={100}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'left top',
                      }}
                      sizes='100%'
                      alt='Реклама'
                      src={URL_IMG + '/img/ads/' + banner.img}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </>
          ) : null}
        </Swiper>
      ) : (
        <>
          {size == ISizes.Big ? (
            <>
              <div className={'post__banner-none position-relative'}>
                <p>Здесь могла быть ваша реклама</p>
              </div>
            </>
          ) : size == ISizes.Small ? (
            <>
              <div className={'news__banner-none position-relative w-100'}>
                <p>Здесь могла быть ваша реклама</p>
              </div>
            </>
          ) : null}
        </>
      )}
    </Fragment>
  );
};
