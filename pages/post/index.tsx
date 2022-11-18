import { getAllPosts } from 'api/Post';
import { TITLE, URL_IMG } from 'app/config';
import { IPostModel } from 'app/models';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { EmptyComponent } from 'modules/elements';

export async function getServerSideProps() {
  const { data } = await getAllPosts();

  return {
    props: {
      posts: data,
    },
  };
}

interface IPostsChild {
  posts: IPostModel[];
}

const Posts: FC<IPostsChild> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Новости | {TITLE}</title>
      </Head>
      <section className={'news-page'}>
        <Container>
          <h1 className='title'>Новости</h1>

          <Row className='news-page__body'>
            {posts.length ? (
              posts.map((post: IPostModel) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={post.id}
                  className='d-flex'>
                  <Link className='news-page__item' href={`/post/${post.id}`}>
                    <span className='news-page__img'>
                      <Image
                        src={URL_IMG + post.img}
                        alt={''}
                        width={100}
                        height={100}
                        sizes={'100%'}
                      />
                    </span>
                    <span className='news-page__content'>
                      <h2 className='news-page__title'>{post.title}</h2>
                      <span className='news-page__date'>{post.created}</span>
                    </span>
                  </Link>
                </Col>
              ))
            ) : (
              <EmptyComponent />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Posts;
