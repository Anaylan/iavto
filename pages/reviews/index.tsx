import { TITLE } from 'app/config';
import Head from 'next/head';
import { Container, Row } from 'react-bootstrap';
import { ReviewCard } from 'modules/elements/Cards/ReviewCard';
import { useFetch } from 'app/hooks';
import { useState } from 'react';
import { getUserReviews } from 'api/Review';
import { IReviewDataModel, IReviewModel } from 'app/models';
import { Load } from 'assets/icon/icons';

export default function Reviews() {
  const [reviews, setReviews] = useState<IReviewDataModel[]>();
  const [isLoading, errors] = useFetch(() => {
    getUserReviews().then(({ data }: { data: IReviewDataModel[] }) => {
      setReviews(data);
      console.log(data);
    });
  });
  return (
    <>
      <Head>
        <title>Отзывы | {TITLE}</title>
      </Head>
      <section className={'reviews'}>
        <div className={'carpark-reviews'}>
          <Container>
            <div className={'carpark-reviews__body'}>
              <h2 className={`carpark-reviews__title title`}>Мои отзывы</h2>
              <Row>
                {reviews &&
                  reviews.map((review: IReviewDataModel, index: number) => (
                    <ReviewCard review={review} key={index} />
                  ))}
              </Row>
            </div>
            {isLoading ? <Load /> : null}
          </Container>
        </div>
      </section>
    </>
  );
}
