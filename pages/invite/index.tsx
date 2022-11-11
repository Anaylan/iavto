import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import styles from 'assets/sass/components/referral.module.scss'
import { Carpark, Driver } from 'assets/icon/icons'

export default function Invite() {
  return (
    <>
      <section className={styles['referal']}>
        <Container>
          <Row className='gx-5 align-items-center justify-content-center flex-column flex-md-row'>
            <Col xs={12} md={6}>
              <Link className={`${styles['referal__btn']}`} href='#'>
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={styles['icon']}>
                    <Driver className={styles['icon__item']} />
                    {/* <use xlink:href='#driver'></use> */}
                  </div>
                  <span>Я водитель</span>
                </span>
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <Link
                className={`${styles['referal__btn']} ${styles['referal__btn_carpark']}`}
                href='#'
              >
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={styles['icon']}>
                    <Carpark className={styles['icon__item']} />
                    {/* <use xlink:href='#carpark'></use> */}
                  </div>
                  <span>Я автопарк</span>
                </span>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
