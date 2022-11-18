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
                src='https://iavto.team/_next/image?url=https%3A%2F%2Fxn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai%2Fimg%2F100000%2FScreenshot_44.jpg&w=1920&q=75'
                alt=''
              />
            </div>
            <div className='post__text'>
              <h2>Заголовок h2</h2>
              <p>
                <strong>Я брать машина на сутки.</strong>&nbsp;Все класс. Парк
                хороший. Авто хороший. Звонил им, взял машина, ездил на машина
                10 часов все было хорошо. Машина не ломаться, руль крутиться,
                коляса поворачиваться. Потом яма была, в яму упала, я жив.
              </p>
              <h3>Заголовок h3</h3>
              <p>
                <span style={{ textDecoration: 'underline' }}>Права</span>&nbsp;
                теперь нет, автопарк сказал, что машина должен вернуть, я машина
                вернуть в состоянии плохой. Но парк сказал, что машина не&nbsp;
                <em>годится</em>.&nbsp;Надо кредит брать, помогите кто нибудь
                лада&nbsp;<a href='#'>купить</a>
              </p>
              <h4>Заголовок h4</h4>
              <ul>
                <li>Пункт</li>
                <li>Пункт</li>
                <li>Пункт</li>
              </ul>
              <h2>Заголовок h2</h2>
              <ol>
                <li>Пункт</li>
                <li>
                  <span style={{ textDecoration: 'underline' }}>Права</span>
                  &nbsp; теперь нет, автопарк сказал, что машина должен вернуть,
                  я машина вернуть в состоянии плохой. Но парк сказал, что
                  машина не&nbsp;
                  <em>годится</em>.&nbsp;Надо кредит брать, помогите кто нибудь
                  лада&nbsp;<a href='#'>купить</a>
                  <ol>
                    <li>Пункт</li>
                    <li>Пункт</li>
                    <li>
                      Пункт
                      <ol>
                        <li>Пункт</li>
                        <li>Пункт</li>
                        <li>Пункт</li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  Пункт
                  <ul>
                    <li>Пункт</li>
                    <li>Пункт</li>
                    <li>Пункт</li>
                  </ul>
                </li>
              </ol>
              <h4>Заголовок h4</h4>
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
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
