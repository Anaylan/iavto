import React from 'react'
import Head from 'next/head'
import { TITLE } from 'app/config'
import { Container } from 'react-bootstrap'
import { Form } from 'modules/UI/forms/Form'
export default function Rules() {
  return (
    <>
      <Head>
        <title>Правила | {TITLE}</title>
      </Head>
      <Container></Container>
    </>
  )
}
