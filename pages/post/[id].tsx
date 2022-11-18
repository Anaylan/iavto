import React from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { IPostModel } from 'app/models';
import { getPost } from 'api/Post';
import { Container, Row, Col } from 'react-bootstrap';

export async function getServerSideProps({ params }: any) {
  const res = await getPost(params.id);

  return {
    props: {
      post: res.data,
    },
  };
}

export default function Post({ post }: { post: IPostModel }) {
  console.log(post);
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
              <div className='post__date'>2022-08-29</div>
              <h1 className='post__title title'>Мы открылись!</h1>
            </div>
            <div className='post__img'>
              <img
                src='https://lockpixel.ru/_next/image?url=https%3A%2F%2Fxn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai%2Fimg%2F%2F100000%2FScreenshot_44.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='post__text'>
              <p>
                <strong>Я брать машина на сутки.</strong> Все класс. Парк
                хороший. Авто хороший. Звонил им, взял машина, ездил на машина
                10 часов все было хорошо. Машина не ломаться, руль крутиться,
                коляса поворачиваться. Потом яма была, в яму упала, я жив.
              </p>
              <p>
                <span style={{ textDecoration: 'underline' }}>Права</span>{' '}
                теперь нет, автопарк сказал, что машина должен вернуть, я машина
                вернуть в состоянии плохой. Но парк сказал, что машина не
                годится. Надо кредит брать, помогите кто нибудь лада купить
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
