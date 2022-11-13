import Link from 'next/link';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getUserByToken } from 'api/User';
import { ILink, UserModel } from 'app/models';
import * as auth from 'app/redux/reducers/authReducer';
import { User } from 'assets/icon/icons';

import { HeaderMenu, SearchInput } from 'modules/UI';
import { useDispatch, useSelector } from 'react-redux';

// import {Button} from '../buttons/Button'

interface SearchField {
  placeholder: string;
}

interface Children extends ILink {
  children?: React.ReactNode;
}

interface IChildProps {
  desktop: boolean;
  links: ILink[];
}

interface IHeaderTop {
  links?: any;
  desktop?: any;
  props?: {
    desktop: boolean;
    links: ILink[];
  };
  ref: any;
}

export const HeaderTopLink: React.FC<Children> = ({
  href,
  children,
  title,
}) => {
  return (
    <>
      <li className={`header-top__item`}>
        <Link className={`header-top__link`} href={href}>
          <div className={'icon'}>{children}</div>
          <span>{title}</span>
        </Link>
      </li>
    </>
  );
};

export const HeaderTop = forwardRef<HTMLElement, IChildProps>((props, ref) => {
  const button: React.RefObject<any> = useRef();

  const dispatch = useDispatch();

  const [active, setActive] = useState<boolean>(false);

  const token = useSelector(
    ({ header }: { header: auth.IAuthState }) => header.title,
  );

  const [user, setUser] = useState<UserModel>({ status: 403, data: null });

  const onClick = () => {
    setActive(!active);

    if (!active) {
      button.current.classList.add('open-nav');
      document.body.classList.add('lock');
    } else {
      button.current.classList.remove('open-nav');
      document.body.classList.remove('lock');
    }
  };

  useEffect(() => {
    getUserByToken().then(({ data }: { data: UserModel }) => {
      if (data.status !== 403) {
        setUser(data);
      } else {
        if (token) {
          dispatch(auth.actions.logout());
        }
      }
    });
  }, [dispatch, token]);

  // useChange(token, ()=>{
  //   getUserByToken().then(({ data }: { data: UserModel }) => {
  //     setUser(data)
  //   })
  //   console.log(user)
  // });

  return (
    <>
      <Col ref={ref} className={`header__top header-top`}>
        <Container>
          <Row className='align-items-center'>
            <Col
              xs={12}
              lg={2}
              className={
                'd-flex align-items-center justify-content-between justify-content-lg-start'
              }
            >
              <Link
                className={'header-top__logo'}
                href={'/'}
                onClick={() => {
                  setActive(false);
                  button.current.classList.remove('open-nav');
                  document.body.classList.remove('lock');
                }}
              >
                яавто.рф
              </Link>
              <button
                onClick={onClick}
                className={`nav-button d-flex align-items-center d-lg-none`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navToggle'
                aria-expanded='false'
                aria-controls='navToggle'
              >
                <div ref={button} className={'nav-anim'}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </Col>

            {/*Не рендерить на мобилке*/}
            {props.desktop ? (
              <>
                <Col xs={12} lg={5}>
                  <SearchInput placeholder={'Поиск...'} />
                </Col>
                <Col xs={12} lg={5}>
                  <ul className={'header-top__list'}>
                    {props.links.map((link: any, key: number) => (
                      <HeaderTopLink
                        key={key}
                        href={link.href}
                        title={link.title}
                      >
                        {link.children}
                      </HeaderTopLink>
                    ))}
                    {user.status === 201 ? (
                      <HeaderTopLink
                        href={'/profile'}
                        title={user.data?.firstname}
                      >
                        <User />
                      </HeaderTopLink>
                    ) : (
                      <HeaderTopLink href={'/auth/signin'} title={'Войти'}>
                        <User />
                      </HeaderTopLink>
                    )}
                  </ul>
                </Col>
              </>
            ) : null}
          </Row>
        </Container>
      </Col>
      {/*Рендерить на мобилке*/}
      {active ? <HeaderMenu onClick={onClick} user={user.data} /> : null}
    </>
  );
});

HeaderTop.displayName = 'HeaderTop';
