import React from 'react'
import Link from 'next/link'
import styles from 'assets/sass/components/header/body.module.scss'
import { Col, Container, Row } from 'react-bootstrap'
import { ILink } from 'app/models'

interface IHeaderBody {
  links: ILink[]
}

export const HeaderBodyLink: React.FC<ILink> = ({ href, title }) => {
  return (
    <>
      <li className={`${styles['header-body__item']}`}>
        <Link href={href}>{title}</Link>
      </li>
    </>
  )
}

export const HeaderBody: React.FC<IHeaderBody> = ({ links }) => {
  return (
    <>
      <div
        className={`header__body ${styles['header-body']} d-none d-lg-block`}
      >
        <Container>
          <Row>
            <Col
              as={'ul'}
              className={`${styles['header-body__list']} d-flex align-items-center`}
            >
              {links.map((link, key) => (
                <HeaderBodyLink key={key} href={link.href} title={link.title} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
