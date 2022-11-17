import { Star } from 'assets/icon/icons'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'
import { IReviewModel } from 'app/models'
import { month, dbFormatDate } from 'libs/functions'
import { URL_IMG } from 'app/config'
import Image from 'next/image'

export const getStars = (rating: number) => {
  let content = []
  for (let id = 0; id < rating; id++) {
    const item = id
    content.push(
      <div className={'icon'} key={id}>
        <Star />
      </div>
    )
  }
  return content
}

export const ReviewCard = ({ review }: { review: IReviewModel }) => {
  return (
    <Col xs={12} className={'reviews__col'}>
      <div className={`carpark-reviews__item cars-item`}>
        <Row>
          <Col xs={12} md={4} className='d-flex'>
            <Link className={'cars-item__img'} href={`/car/${review.pid}`}>
              <Image
                src={URL_IMG + `/` + review.cid + `/` + review.img![0]}
                width={100}
                height={100}
                alt={`${review.mark} ${review.model}`}
              />
            </Link>
          </Col>
          <Col xs={12} md={8}>
            <div className={`carpark-reviews__top carpark-reviews__top`}>
              <div className='d-flex flex-column order-2 order-md-1'>
                <Link
                  className={'cars-item__title'}
                  href={`/car/${review.pid}`}
                >
                  {review.mark} {review.model}
                  <span>{review.year}</span>
                </Link>

                <div className={'cars-item__subtitle'}>
                  Автопарк:
                  <Link href={`/carpark/${review.cid}`}>
                    {review.company_name}
                  </Link>
                </div>
                <div className={'cars-item__price'}>
                  <span>{review.price}</span>
                  <div>руб / сут</div>
                </div>
              </div>
              <div
                className={`reviews__rate order-1 d-flex justify-content-between justify-content-md-end order-md-2 `}
              >
                <div className='d-flex'>
                  <time
                    className={`carpark-reviews__date carpark-reviews__date`}
                    dateTime={review.date_created}
                  >
                    {dbFormatDate(review.date_created, month)}
                  </time>
                  <div
                    className={`carpark-reviews__rate carpark-reviews__rate`}
                  >
                    {getStars(review.rating)}
                    {/* {review.raiting} */}
                    {/* {review.rating.map((item, key) => (
 
                    ))} */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`carpark-reviews__comment carpark-reviews__comment`}
            >
              <div className={'carpark-reviews__text'}>
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
