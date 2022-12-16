import { useEffect } from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { IPlaces, IPostModel } from 'app/models';
import { getPost, requestViewPost } from 'api/Post';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { URL_IMG } from 'app/config';
import { sanitize } from 'libs/functions';
import { AdBlock, ISizes } from 'modules/elements/advert/AdBlock';

export async function getServerSideProps({ params }: any) {
  const { data } = await getPost(params.id);

  return {
    props: {
      post: data,
    },
  };
}

export default function Post({ post }: { post: IPostModel }) {
  // console.log(post);
  useEffect(() => {
    requestViewPost(post.id).then(({ data }) => {});
  }, [post]);
  return (
    <>
      <Head>
        <title>
          {post.title} | {TITLE}
        </title>
      </Head>
      <section className='post'>
        {/* {post && (
          <>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>{post.created}</p>
          </>
        )} */}
        <Container>
          <div className='post__body'>
            <div className='post__header'>
              <div className='post__date'>{post.created}</div>
              <h1 className='post__title title'>{post.title}</h1>
            </div>
            <div className='post__img'>
              <Image
                src={URL_IMG + '/img/news/' + post.img}
                alt={post.title}
                width={100}
                height={100}
                sizes={'100%'}
              />
            </div>
            <div
              className='post__text'
              dangerouslySetInnerHTML={sanitize(post.description)}
            />

            <AdBlock type={IPlaces.post} size={ISizes.Big}/>
          </div>
        </Container>
      </section>
    </>
  );
}
