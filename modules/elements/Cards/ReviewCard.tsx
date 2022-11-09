import { Star } from 'assets/icon/icons'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'
import carList from '/assets/sass/components/card/car-list.module.scss'
import carparkReviews from '/assets/sass/components/carpark/carpark-reviews.module.scss'
import reviews from '/assets/sass/components/reviews/reviews.module.scss'
import { IReviewModel } from 'app/models'
import { month, dbFormatDate } from 'libs/functions'

export const ReviewCard = ({ review }: { review: IReviewModel }) => {
  return (
    <Col xs={12} className={reviews['reviews__col']}>
      <div
        className={`${reviews['carpark-reviews__item']} ${carList['cars-item']}`}
      >
        <Row>
          <Col xs={12} md={4} className='d-flex'>
            <Link className={carList['cars-item__img']} href='#'>
              {/* <Image src={review.img} width={100} height={100} alt='' /> */}
            </Link>
          </Col>
          <Col xs={12} md={8}>
            <div
              className={`${carparkReviews['carpark-reviews__top']} ${reviews['carpark-reviews__top']}`}
            >
              <div className='d-flex flex-column order-2 order-md-1'>
                <Link className={carList['cars-item__title']} href='#'>
                  {review.mark} {review.model}
                  <span>{review.year}</span>
                </Link>

                <div className={carList['cars-item__subtitle']}>
                  Автопарк:<a href='#'>{review.carpark}</a>
                </div>
                <div className={carList['cars-item__price']}>
                  <span>{review.price}</span>
                  <div>руб / сут</div>
                </div>
              </div>
              <div
                className={`${reviews['reviews__rate']} order-1 d-flex justify-content-between justify-content-md-end order-md-2 `}
              >
                <div className='d-flex'>
                  <time
                    className={`${carparkReviews['carpark-reviews__date']} ${reviews['carpark-reviews__date']}`}
                    dateTime={review.date_created}
                  >
                    {dbFormatDate(review.date_created, month)}
                  </time>
                  <div
                    className={`${carparkReviews['carpark-reviews__rate']} ${reviews['carpark-reviews__rate']}`}
                  >
                    {Array(4)
                      .fill(1, 0, 4)
                      .map((item, key) => (
                        <div className={carparkReviews['icon']} key={key}>
                          <Star color={carparkReviews['icon__item']} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${carparkReviews['carpark-reviews__comment']} ${reviews['carpark-reviews__comment']}`}
            >
              <div className={carparkReviews['carpark-reviews__text']}>
                <span>Комментарий:</span>
                <p>{review.comment}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  )
}
