import { ArrowLeft } from 'assets/icon/icons';
import Image from 'next/image';
export const ChatMessenger = () => {
  return (
    <>
      <div className={`messenger__header messenger-header`}>
        <div className={`messenger-header__row`}>
          <div className='d-flex align-items-center'>
            <a className={`messenger-header__back d-lg-none `} href='#'>
              <span className={`icon`}>
                <ArrowLeft />
              </span>
            </a>
            <a className={`messenger-header__user`} href='#'>
              <span className={`messenger-header__img`}>
                <Image width={100} height={100} src='/media/user.png' alt='' />
              </span>
              <span className={`messenger-header__username`}>
                Сергей Улыбка
              </span>
            </a>
          </div>
          <button className='btn-param' type='button'>
            <span></span>
          </button>
        </div>
      </div>
      <div className={`messenger__body messenger-body`}>
        <ul className={`messenger-body__list`}>
          <li className={`messenger-body__date`}>
            <time dateTime='2022-10-15'>15.10.2022</time>
          </li>

          <li className={`'messenger-body__message message message-companion`}>
            <div className={`message__wrapper`}>
              <div className={`message__body`}>
                <div className={`message__top message-top`}>
                  <div className={`message-top__username`}>Сергей Улыбка</div>
                  <time
                    className={`message-top__time`}
                    dateTime='2022-10-15 10:01'
                  >
                    10:01
                  </time>
                </div>
                <div className={`message__main message-main`}>
                  <div className={`message-main__text`}>
                    <p>Салам, молодой! Как жизнь твоя?</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={`messenger-body__message message message-you`}>
            <div className={`message__wrapper`}>
              <div className={`message__body`}>
                <div className={`message__top message-top`}>
                  <div className={`message-top__username`}>Вы</div>
                  <time
                    className={`message-top__time`}
                    dateTime='2022-10-15 10:01'
                  >
                    10:05
                  </time>
                </div>
                <div className={`message__main message-main`}>
                  <div className={`message-main__text`}>
                    <p>
                      Че ты пишешь постоянно??!! Я 3 минуты не отвечал...
                      пи*дец...
                    </p>
                  </div>
                  <div className={`message-main__photos`}>
                    <a
                      className={`message-main__img`}
                      href='img/banners/01.png'
                    >
                      <Image
                        width={100}
                        height={100}
                        src='/media/carpark.png'
                        alt=''
                        data-fancybox='messagePhotos1'
                        data-caption=''
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
