import React from 'react'
import { getAllPosts } from 'api/Post'
import { IPostModel } from 'app/models'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import Head from 'next/head'
import { TITLE } from 'app/config'

export async function getServerSideProps() {
  const { data } = await getAllPosts()

  return {
    props: {
      posts: data
    }
  }
}

const Posts: ({ posts }: { posts: IPostModel[] }) => JSX.Element = ({
  posts
}: {
  posts: IPostModel[]
}) => {
  return (
    <>
      <Head>
        <title>Новости | {TITLE}</title>
      </Head>
      <Container className={'d-flex flex-column'}>
        {posts.map((post) => (
          <div key={post.id} className={'mt-3'}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </div>
        ))}
      </Container>
    </>
  )
}

export default Posts
