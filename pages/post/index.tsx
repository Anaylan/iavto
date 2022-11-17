import { getAllPosts } from 'api/Post';
import { TITLE } from 'app/config';
import { IPostModel } from 'app/models';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import { Container } from 'react-bootstrap';

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
      <Container className={'d-flex flex-column'}>
        {posts.length ? (
          posts.map((post: IPostModel) => (
            <div key={post.id} className={'mt-3'}>
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </div>
          ))
        ) : (
          <>Пусто</>
        )}
      </Container>
    </>
  );
};

export default Posts;
