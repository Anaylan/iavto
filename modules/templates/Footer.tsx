import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  OK,
  Rutube,
  Telegram,
  VK,
  YandexZen,
  Youtube,
} from 'assets/icon/icons';
import { useAccordionButton } from 'react-bootstrap';
import { totalmem } from 'os';

const Footer: React.FC = () => {
  const [eventKey, setEventKey] = useState('1');
  const accordion = useAccordionButton(eventKey, () => {
    console.log(totalmem);
  });
  return (
    <footer className='footer' id='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-lg-4 d-flex flex-column col-lg-4'>
            <div className='footer__main'>
              <Link className='footer__logo' href='/'>
                ЯАВТО.РФ
              </Link>
              <div className='footer__socials'>
                <a
                  className='icon'
                  id='vkIcon'
                  target={'_blank'}
                  href='https://vk.com/public214842462'
                  rel='noreferrer'>
                  <VK />
                </a>
                <a
                  className='icon'
                  id='telegramIcon'
                  target={'_blank'}
                  href='https://t.me/iavtorf'
                  rel='noreferrer'>
                  <Telegram />
                </a>
                <a
                  className='icon'
                  id='youtubeIcon'
                  target={'_blank'}
                  href='https://www.youtube.com/channel/UCGBEAIl2P9cAPK2NuKMH3Rg'
                  rel='noreferrer'>
                  <Youtube />
                </a>
                <a
                  className='icon'
                  id='rutubeIcon'
                  target={'_blank'}
                  href='https://rutube.ru/channel/5004511/'
                  rel='noreferrer'>
                  <Rutube />
                </a>
                <a
                  className='icon'
                  id='okIcon'
                  target={'_blank'}
                  href='https://ok.ru/group/70000001001697'
                  rel='noreferrer'>
                  <OK />
                </a>
                <a
                  className='icon'
                  id='yandexZenIcon'
                  target={'_blank'}
                  href='https://dzen.ru/iavto'
                  rel='noreferrer'>
                  <YandexZen />
                </a>
              </div>
            </div>
            <div className='footer__copyright d-none d-lg-block'>
              2022 © ЯАВТО.РФ Все права защищены
            </div>
          </div>

          <div className='col-12 col-lg-8 d-none d-lg-block'>
            <div className='row'>
              <div className='col-12 col-lg-4 d-flex flex-column'>
                <div className='footer__list-title'>Водителям</div>
                <ul className='footer__list'>
                  <li>
                    <Link href='#'>Ссылка</Link>
                  </li>
                </ul>
              </div>
              <div className='col-12 col-lg-4 d-flex flex-column'>
                <div className='footer__list-title'>Автопаркам</div>
                <ul className='footer__list'>
                  <li>
                    <Link href='#'>Ссылка</Link>
                  </li>
                </ul>
              </div>
              <div className='col-12 col-lg-4 d-flex flex-column'>
                <div className='footer__list-title'>Партнерам</div>
                <ul className='footer__list'>
                  <li>
                    <Link href='#'>Ссылка</Link>
                  </li>
                  {/* <li>
                    <a className='footer__link-app' href='#'>
                      <Image
                        width={100}
                        height={100}
                        sizes='100%'
                        src='/media/google-play.png'
                        alt=''
                      />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className='col-12 col-lg-8 d-lg-none'>
            <div className='row gx-0'>
              <div className='footer__col col-12 col-lg-4 d-flex flex-column'>
                <button
                  className='footer__list-title'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseLink1'
                  aria-expanded='false'
                  aria-controls='collapseLink1'>
                  Водителям
                </button>
                <div className='collapse' id='collapseLink1'>
                  <ul className='footer__list'>
                    <li>
                      <Link href='#'>Ссылка</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='footer__col col-12 col-lg-4 d-flex flex-column'>
                <button
                  className='footer__list-title'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseLink2'
                  aria-expanded='false'
                  aria-controls='collapseLink2'>
                  Автопаркам
                </button>
                <div className='collapse' id='collapseLink2'>
                  <ul className='footer__list'>
                    <li>
                      <Link href='#'>Ссылка</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='footer__col col-12 col-lg-4 d-flex flex-column'>
                <button
                  className='footer__list-title'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseLink3'
                  aria-expanded='false'
                  aria-controls='collapseLink3'>
                  Партнерам
                </button>
                <div className='collapse' id='collapseLink3'>
                  <ul className='footer__list'>
                    <li>
                      <Link href='#'>Ссылка</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <a className='footer__link-app' href='#'>
              <Image
                sizes='100%'
                width={100}
                height={100}
                src='/media/google-play.png'
                alt=''
              />
            </a> */}
            <div className='footer__copyright d-block d-lg-none mt-3'>
              2022 © ЯАВТО.РФ Все права защищены
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
