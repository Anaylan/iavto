import { Star } from 'assets/icon/icons';
import React from 'react';
import Image from 'next/image';
import { IReviewModel } from 'app/models';
import { dbFormatDate, month, getStars } from 'libs/functions';

export const Review = ({ review }: { review: IReviewModel }) => {
  return (
    <>
      <div className={'carpark-reviews__item'}>
        <div className={'carpark-reviews__top'}>
          <div className={'carpark-reviews__info'}>
            <div className={'carpark-reviews__photo'}>
              <Image
                src='/media/user.png'
                width={100}
                height={100}
                sizes='100%'
                alt=''
              />
            </div>
            <div className={'carpark-reviews__user-data'}>
              <div className={'carpark-reviews__username'}>
                {review.user_firstname} {review.user_lastname}
              </div>
              <div className={'carpark-reviews__position'}>Водитель</div>
            </div>
          </div>
          <div className={'carpark-reviews__review-info'}>
            <time className={'carpark-reviews__date'} dateTime='2022-04-22'>
              {dbFormatDate(review.date_created, month)}
            </time>
            <div className={'carpark-reviews__rate'}>
              {getStars(review.rating)}
            </div>
          </div>
        </div>
        <div className={'carpark-reviews__comment'}>
          <div className={'carpark-reviews__text'}>
            <span>Автомобиль:</span>
            <p>
              {review.mark} {review.model}
            </p>
          </div>
          <div className={'carpark-reviews__text'}>
            <span>Комментарий:</span>
            <p>{review.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
};
