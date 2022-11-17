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
import Collapse from 'react-bootstrap/Collapse';

const Footer: React.FC = () => {
  const [eventKey, setEventKey] = useState('1');
  const [collapse, setCollapse] = useState({
    driver: false,
    carpark: false,
    parthner: false,
  });
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
                    <Link href='/auth/signin'>Авторизация</Link>
                  </li>
                  <li>
                    <Link href='/carpark'>Автопарки</Link>
                  </li>
                  <li>
                    <Link href='/car'>Автомобили</Link>
                  </li>
                  <li>
                    <Link href='/rules'>Правила</Link>
                  </li>
                  <li>
                    <Link href='/pay'>Оплата</Link>
                  </li>
                  <li>
                    <Link href='/feedback'>Обратная связь</Link>
                  </li>
                  <li>
                    <Link href='/about'>О нас</Link>
                  </li>
                  <li>
                    <Link href='/post'>Новости</Link>
                  </li>
                  <li>
                    <Link href='/documents/terms'>
                      Пользовательское соглашение
                    </Link>
                  </li>
                  <li>
                    <Link href='/documents/privacy_policy'>
                      Политика конфиденциальности
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-12 col-lg-4 d-flex flex-column'>
                <div className='footer__list-title'>Автопаркам</div>
                <ul className='footer__list'>
                  <li>
                    <Link href='https://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/main/'>
                      Открыть автопарк
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='col-12 col-lg-4 d-flex flex-column'>
                <div className='footer__list-title'>Партнерам</div>
                <ul className='footer__list'>
                  <li>
                    <Link href='partners'>Для партнеров</Link>
                  </li>
                  <li>
                    <Link href='referrals'>Для реферальных партнеров</Link>
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
                  aria-expanded={collapse.driver}
                  aria-controls='collapseLink1'
                  onClick={() => {
                    setCollapse({ ...collapse, driver: !collapse.driver });
                  }}>
                  Водителям
                </button>
                <Collapse in={collapse.driver}>
                  <div id='collapseLink1'>
                    {' '}
                    {/* На такой див стили не навешивать (и не создавать родительский и дочерний див со стилями!) */}
                    <ul className='footer__list'>
                      <li>
                        <Link href='/auth/signin'>Авторизация</Link>
                      </li>
                      <li>
                        <Link href='/carpark'>Автопарки</Link>
                      </li>
                      <li>
                        <Link href='/car'>Автомобили</Link>
                      </li>
                      <li>
                        <Link href='/rules'>Правила</Link>
                      </li>
                      <li>
                        <Link href='/pay'>Оплата</Link>
                      </li>
                      <li>
                        <Link href='/feedback'>Обратная связь</Link>
                      </li>
                      <li>
                        <Link href='/about'>О нас</Link>
                      </li>
                      <li>
                        <Link href='/post'>Новости</Link>
                      </li>
                      <li>
                        <Link href='/documents/terms'>
                          Пользовательское соглашение
                        </Link>
                      </li>
                      <li>
                        <Link href='/documents/privacy_policy'>
                          Политика конфиденциальности
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </div>
              <div className='footer__col col-12 col-lg-4 d-flex flex-column'>
                <button
                  className='footer__list-title'
                  type='button'
                  onClick={() =>
                    setCollapse({ ...collapse, carpark: !collapse.carpark })
                  }
                  aria-expanded={collapse.carpark}
                  aria-controls='collapseLink2'>
                  Автопаркам
                </button>
                <Collapse in={collapse.carpark}>
                  <div id='collapseLink2'>
                    <ul className='footer__list'>
                      <li>
                        <Link href='https://xn--80aaf7asgim.xn--80ae0bp6d.xn--p1ai/main/'>
                          Открыть автопарк
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
              </div>
              <div className='footer__col col-12 col-lg-4 d-flex flex-column'>
                <button
                  className='footer__list-title'
                  type='button'
                  onClick={() =>
                    setCollapse({ ...collapse, parthner: !collapse.parthner })
                  }
                  aria-expanded={collapse.parthner}
                  aria-controls='collapseLink3'>
                  Партнерам
                </button>
                <Collapse in={collapse.parthner}>
                  <div id='collapseLink3'>
                    <ul className='footer__list'>
                      <li>
                        <Link href='partners'>Для партнеров</Link>
                      </li>
                      <li>
                        <Link href='referrals'>Для реферальных партнеров</Link>
                      </li>
                    </ul>
                  </div>
                </Collapse>
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
