import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Carpark, Driver } from 'assets/icon/icons'

export default function Invite() {
  return (
    <>
      <section className={'referal'}>
        <Container>
          <Row className='gx-5 align-items-center justify-content-center flex-column flex-md-row'>
            <Col xs={12} md={6}>
              <Link className={`referal__btn`} href='#'>
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={'icon'}>
                    <Driver className={'icon__item'} />
                    {/* <use xlink:href='#driver'></use> */}
                  </div>
                  <span>Я водитель</span>
                </span>
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <Link className={`referal__btn referal__btn_carpark`} href='#'>
                <span className='d-flex align-items-center justify-content-center'>
                  <div className={'icon'}>
                    <Carpark className={'icon__item'} />
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
