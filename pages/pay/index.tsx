import React from 'react'
import Head from 'next/head'
import { TITLE } from '../_app'

export default function Pay() {
  return (
    <>
      <Head>
        <title>Оплата | {TITLE}</title>
      </Head>
      <div>Оплата</div>
    </>
  )
}
