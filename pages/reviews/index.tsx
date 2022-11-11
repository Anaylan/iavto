import { TITLE } from 'app/config'
import Head from 'next/head'
import { Container, Row } from 'react-bootstrap'
import carparkReviews from '/assets/sass/components/carpark/carpark-reviews.module.scss'
import reviewStyle from '/assets/sass/components/reviews/reviews.module.scss'
import { ReviewCard } from 'modules/elements/Cards/ReviewCard'
import { useFetch } from 'app/hooks'
import { useState } from 'react'
import { getUserReviews } from 'api/Review'
import { IReviewModel } from 'app/models'
import { Load } from 'assets/icon/icons'

export default function Reviews() {
  const [reviews, setReviews] = useState<IReviewModel[]>()
  const [isLoading, errors] = useFetch(() => {
    getUserReviews().then(({ data }: { data: IReviewModel[] }) => {
      setReviews(data)
      console.log(data)
    })
  })
  return (
    <>
      <Head>
        <title>Отзывы | {TITLE}</title>
      </Head>
      <section className={reviewStyle['reviews']}>
        <div className={carparkReviews['carpark-reviews']}>
          <Container>
            <div className={carparkReviews['carpark-reviews__body']}>
              <h2
                className={`${carparkReviews['carpark-reviews__title']} title`}
              >
                Мои отзывы
              </h2>
              <Row>
                {reviews &&
                  reviews.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))}
              </Row>
            </div>
            {isLoading ? <Load /> : null}
          </Container>
        </div>
      </section>
    </>
  )
}
