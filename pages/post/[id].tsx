import { useEffect } from 'react';
import Head from 'next/head';
import { TITLE } from 'app/config';
import { IPostModel } from 'app/models';
import { getPost, requestViewPost } from 'api/Post';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { URL_IMG } from 'app/config';

export async function getServerSideProps({ params }: any) {
  const res = await getPost(params.id);

  return {
    props: {
      post: res.data,
    },
  };
}

export default function Post({ post }: { post: IPostModel }) {
  // console.log(post);
  useEffect(() => {
    requestViewPost(post.id).then(({ data }) => {
      console.log(data);
    });
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
              <div className='post__date'>2022-08-29</div>
              <h1 className='post__title title'>Мы открылись!</h1>
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
            <div className='post__text'>
              {post.description}
              {/* 
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>
                        <div className='table__head'>Логин</div>
                      </th>
                      <th>
                        <div className='table__head'>Дата регистрации</div>
                      </th>
                      <th>
                        <div className='table__head'>Процент</div>
                      </th>
                      <th>
                        <div className='table__head'>Платежи</div>
                      </th>
                      <th>
                        <div className='table__head'>Прибыль</div>
                      </th>
                      <th>
                        <div className='table__head'>Статус</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className='table__item'>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>10.10.22</div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className='table__wait'>
                        <div className='table__item'>Ожидается</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='table__item'>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>10.10.22</div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className='table__success'>
                        <div className='table__item'>Оплачено</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='table__item'>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>10.10.22</div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className='table__success'>
                        <div className='table__item'>Оплачено</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='table__item'>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>10.10.22</div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className='table__success'>
                        <div className='table__item'>Оплачено</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='table__item'>
                          <a href='#'>DanilTech228</a>
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>10.10.22</div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <span>10</span>%
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td>
                        <div className='table__item'>
                          <div>500.00</div>₽
                        </div>
                      </td>
                      <td className='table__success'>
                        <div className='table__item'>Оплачено</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
            {/* <Link className='post__banner' href='#'>
              <img
                src='https://iavto.team/_next/image?url=https%3A%2F%2Fxn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai%2Fimg%2F100000%2FScreenshot_44.jpg&w=1920&q=75'
                alt=''
              />
            </Link> */}
            <Link className='post__banner-none' href='#'>
              <p>Здесь могла быть ваша реклама</p>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
