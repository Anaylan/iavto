import React from 'react'
import Head from 'next/head'
import { TITLE } from 'app/config'
import { IPostModel } from 'app/models'
import { getPost } from 'api/Post'

export async function getServerSideProps({ params }: any) {
  const res = await getPost(params.id)

  return {
    props: {
      post: res.data
    }
  }
}

export default function Post({ post }: { post: IPostModel }) {
  console.log(post)
  return (
    <>
      <Head>
        <title>
          {post.title} | {TITLE}
        </title>
      </Head>
      <div>
        {post && (
          <>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>{post.id}</p>
            <p>{post.created}</p>
          </>
        )}
      </div>
    </>
  )
}
