import { TITLE } from 'app/config';
import Head from 'next/head';
import { Container, Row } from 'react-bootstrap';
import { ReviewCard } from 'modules/elements/Cards/ReviewCard';
import { useFetch } from 'app/hooks';
import { useState } from 'react';
import { getUserReviews } from 'api/Review';
import { IReviewDataModel, IReviewModel } from 'app/models';
import { Load } from 'assets/icon/icons';

import { useRouter } from 'next/router';

import { UserDataModel } from 'app/models';
import { useSelector } from 'react-redux';
import { EmptyComponent } from 'modules/elements';
export default function Reviews() {
  const [reviews, setReviews] = useState<IReviewDataModel[]>();
  const [isLoading, errors] = useFetch(() => {
    if (user) {
      getUserReviews().then(({ data }: { data: IReviewDataModel[] }) => {
        setReviews(data);
      });
    } else {
      router.push('/auth/signin');
    }
  });
  const router = useRouter();

  const user = useSelector(
    ({ header }: { header: UserDataModel }) => header.user,
  );

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
                {reviews ? (
                  <>
                    {reviews.length > 0 ? (
                      reviews.map((review: IReviewDataModel, index: number) => (
                        <ReviewCard review={review} key={index} />
                      ))
                    ) : (
                      <EmptyComponent />
                    )}
                  </>
                ) : (
                  <EmptyComponent />
                )}
              </Row>
            </div>
            {isLoading ? <Load /> : null}
          </Container>
        </div>
      </section>
    </>
  );
}
