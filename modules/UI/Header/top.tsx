import Link from 'next/link'
import {
  ForwardedRef,
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
  useTransition
} from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { getUserByToken } from 'api/AuthCrud'
import { useScroll } from 'app/hooks'
import { ILink, UserModel } from 'app/models'
import * as auth from 'app/redux/reducers/authReducer'
import { User } from 'assets/icon/icons'
import styles from 'assets/sass/components/header/top.module.scss'
import { HeaderMenu, SearchInput } from 'modules/UI'
import { useDispatch, useSelector } from 'react-redux'

// import {Button} from '../buttons/Button'

interface SearchField {
  placeholder: string
}

interface Children extends ILink {
  children?: React.ReactNode
}

interface IHeaderTop {
  props?: {
    desktop: boolean
    links: ILink[]
  }
  ref: RefObject<any> | ForwardedRef<any>
}

export const HeaderTopLink: React.FC<Children> = ({
  href,
  children,
  title
}) => {
  return (
    <>
      <li className={`${styles['header-top__item']}`}>
        <Link className={`${styles['header-top__link']}`} href={href}>
          <div className={styles.icon}>{children}</div>
          <span>{title}</span>
        </Link>
      </li>
    </>
  )
}

export const HeaderTop: React.FC<IHeaderTop> = forwardRef((props, ref) => {
  const menu: React.RefObject<any> = useRef(null)
  const button: React.RefObject<any> = useRef()

  const dispatch = useDispatch()

  const [show, setShow] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)

  const [isPending, startTransition] = useTransition()

  const token = useSelector(({ header }) => header.title)

  const [user, setUser] = useState<UserModel>({ status: 403, data: null })

  const onClick = () => {
    setActive(!active)

    if (!active) {
      button.current.classList.add(styles['open-nav'])
      document.body.classList.add('lock')
    } else {
      button.current.classList.remove(styles['open-nav'])
      document.body.classList.remove('lock')
    }
  }

  useEffect(() => {
    getUserByToken().then(({ data }: { data: UserModel }) => {
      if (data.status !== 403) {
        setUser(data)
      } else {
        if (token) {
          dispatch(auth.actions.logout())
        }
      }
    })
    console.log(user)
  }, [token])

  // useChange(token, ()=>{
  //   getUserByToken().then(({ data }: { data: UserModel }) => {
  //     setUser(data)
  //   })
  //   console.log(user)
  // });

  useScroll(ref, () => {
    if (window.innerWidth > 992) {
      if (window.pageYOffset > 700) {
        if (!ref.current.classList.contains(styles['header-fixed'])) {
          ref.current.classList.add(styles['header-fixed'])
        }
      } else {
        ref.current.classList.remove(styles['header-fixed'])
      }
    } else {
      if (window.pageYOffset > 65) {
        if (!ref.current.classList.contains(styles['header-fixed'])) {
          ref.current.classList.add(styles['header-fixed'])
        }
      } else {
        ref.current.classList.remove(styles['header-fixed'])
      }
    }
  })

  return (
    <>
      <Col ref={ref} className={`header__top ${styles['header-top']}`}>
        <Container>
          <Row className='align-items-center'>
            <Col
              xs={12}
              lg={2}
              className={
                'd-flex align-items-center justify-content-between justify-content-lg-start'
              }
            >
              <Link className={styles['header-top__logo']} href={'/'}>
                яавто.рф
              </Link>
              <button
                onClick={onClick}
                className={`${styles['nav-button']} d-flex align-items-center d-lg-none`}
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navToggle'
                aria-expanded='false'
                aria-controls='navToggle'
              >
                <div ref={button} className={styles['nav-anim']}>
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
                  <ul className={styles['header-top__list']}>
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
                        title={user.data.firstname}
                      >
                        <User color={styles['icon__item']} />
                      </HeaderTopLink>
                    ) : (
                      <HeaderTopLink href={'/auth/signin'} title={'Войти'}>
                        <User color={styles['icon__item']} />
                      </HeaderTopLink>
                    )}
                  </ul>
                </Col>
              </>
            ) : (
              <></>
            )}
          </Row>
        </Container>
      </Col>
      {/*Рендерить на мобилке*/}
      {active ? (
        <>
          <HeaderMenu />
        </>
      ) : (
        <></>
      )}
    </>
  )
})
