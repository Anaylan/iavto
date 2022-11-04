import { ArrowLeft } from 'assets/icon/icons';
import message from 'assets/sass/components/chat/messenger/message.module.scss';
import messengerBody from 'assets/sass/components/chat/messenger/messenger-body.module.scss';
import messengerHeader from 'assets/sass/components/chat/messenger/messenger-header.module.scss';
import messenger from 'assets/sass/components/chat/messenger/messenger.module.scss';
import Image from 'next/image';
export const ChatMessenger = () => {
  return (
    <>
    <div className={` ${messenger['messenger__header']} ${messengerHeader['messenger-header']}`}>
        <div className={` ${messengerHeader['messenger-header__row']}`}>
        <div className='d-flex align-items-center'>
            <a className={` ${messengerHeader['messenger-header__back']} d-lg-none `} href='#'>
            <span className={` ${messengerHeader['icon']}`}>
                <ArrowLeft color={`${messengerHeader['icon__item']}`}/>
            </span>
            </a>
            <a className={` ${messengerHeader['messenger-header__user']}`} href='#'>
            <span className={` ${messengerHeader['messenger-header__img']}`}>
                <Image width={100} height={100} src='/media/user.png' alt='' />
            </span>
            <span className={` ${messengerHeader['messenger-header__username']}`}>
                Сергей Улыбка
            </span>
            </a>
        </div>
        <button className='btn-param' type='button'>
            <span></span>
        </button>
        </div>
    </div>
    <div className={` ${messenger['messenger__body']} ${messengerBody['messenger-body']}`}>
        <ul className={`${messengerBody['messenger-body__list']}`}>
            <li className={`${messengerBody['messenger-body__date']}`}>
                <time dateTime='2022-10-15'>15.10.2022</time>
            </li>

            <li className={`${messengerBody['messenger-body__message']} ${message['message']} ${message['message-companion']}`}>
                <div className={`${message['message__wrapper']}`}>
                <div className={`${message['message__body']}`}>
                    <div className={`${message['message__top']} ${message['message-top']}`}>
                    <div className={`${message['message-top__username']}`}>
                        Сергей Улыбка
                    </div>
                    <time
                        className={`${message['message-top__time']}`}
                        dateTime='2022-10-15 10:01'
                    >
                        10:01
                    </time>
                    </div>
                    <div className={`${message['message__main']} ${message['message-main']}`}>
                    <div className={`${message['message-main__text']}`}>
                        <p>Салам, молодой! Как жизнь твоя?</p>
                    </div>
                    </div>
                </div>
                </div>
            </li>
            <li className={`${messengerBody['messenger-body__message']} ${message['message']} ${message['message-you']}`}>
                <div className={`${message['message__wrapper']}`}>
                <div className={`${message['message__body']}`}>
                    <div className={`${message['message__top']} ${message['message-top']}`}>
                    <div className={`${message['message-top__username']}`}>Вы</div>
                    <time
                        className={`${message['message-top__time']}`}
                        dateTime='2022-10-15 10:01'
                    >
                        10:05
                    </time>
                    </div>
                    <div className={`${message['message__main']} ${message['message-main']}`}>
                    <div className={`${message['message-main__text']}`}>
                        <p>
                        Че ты пишешь постоянно??!! Я 3 минуты не
                        отвечал... пи*дец...
                        </p>
                    </div>
                    <div className={`${message['message-main__photos']}`}>
                        <a
                        className={`${message['message-main__img']}`}
                        href='img/banners/01.png'
                        >
                        <Image width={100} height={100} src='/media/carpark.png'
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
  )
};
