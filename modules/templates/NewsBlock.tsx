import { getLastPosts } from 'api/Post';
import { IPlaces, IPostModel } from 'app/models';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { URL_IMG } from 'app/config';
import { sanitize } from 'libs/functions';
import { AdBlock, ISizes } from 'modules/elements';

interface NewsProps {
  posts?: IPostModel[];
}
interface PostProps {
  postInfo: IPostModel;
}

const NewsBlock: React.FC<NewsProps> = () => {
  const [posts, setPosts] = useState<IPostModel[]>([]);

  useEffect(() => {
    getLastPosts().then(({ data }: { data: IPostModel[] }) => {
      if (data.length > 0) {
        setPosts(data.slice(0, 1));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className='news__body'>
        <Row className='gy-0'>
          <Col xs={12} md={7}>
            <h2 className='news__title title'>Новости</h2>
            <h3 className='news__subtitle subtitle'>
              Мы собираем самые лучшие и важные новости в мире автомобилей и
              такси
            </h3>
            {posts &&
              posts.map((post, key: number) => (
                <PostPreview key={key} postInfo={post} />
              ))}
          </Col>
          <Col xs={12} md={5}>
            {/* <Link className='news__banner' href='#'>
              <Image
                src={`/media/sber-banner.png`}
                priority={false}
                fill
                sizes='100%'
                alt=''
              />
            </Link> */}
            <AdBlock type={IPlaces['index']} size={ISizes.Small}/>
          </Col>
        </Row>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <Link className='btn-main' href='/post'>
          Смотреть все новости
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NewsBlock;

export const PostPreview: React.FC<PostProps> = ({ postInfo }) => {
  return (
    <React.Fragment>
      <div className='news__item news-item'>
        <div className='news-item__img'>
          <Image
            src={URL_IMG + '/img/news/' + postInfo.img}
            width={100}
            height={100}
            sizes='100%'
            alt='Новость'
          />
        </div>
        <div className='news-item__content'>
          <h4 className='news-item__title'>{postInfo.title}</h4>
          <p dangerouslySetInnerHTML={sanitize(postInfo.description)} />
          <Link href={`/post/${postInfo.id}`}>Подробнеe</Link>
        </div>
      </div>
    </React.Fragment>
  );
};
