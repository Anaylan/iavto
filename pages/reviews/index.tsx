import { TITLE } from 'app/config';
import Head from 'next/head';
import { Container, Row } from 'react-bootstrap';
import carparkReviews from '/assets/sass/components/carpark/carpark-reviews.module.scss';
import reviews from '/assets/sass/components/reviews/reviews.module.scss';


export default function Reviews() {
  return (
    <>
      <Head>
        <title>Отзывы | {TITLE}</title>
      </Head>
      <section className={reviews['reviews']}>
        <div className={carparkReviews['carpark-reviews']}>
          <Container>
            <div className={carparkReviews['carpark-reviews__body']}>
              <h2 className={`${carparkReviews['carpark-reviews__title']} title`}>Мои отзывы</h2>
              <Row>
                {/* {Array(3).fill(1, 0, 4).((item: any, key)=>{
                  <ReviewCard key={key}/>
                })}       */}
              </Row>
            </div>
          </Container>
        </div>
      </section>
    </>
  )
}