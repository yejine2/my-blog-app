import Head from 'next/head'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import CodeBlock from '../../components/CodeBlock'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { MDXRemote } from 'next-mdx-remote'

// 페이지 목록 배열 가져오기
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

// 실제 데이터를 가져와서 뿌리기
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-blue-500 dark:bg-white text-md text-white dark:text-blue-500 rounded-full px-3"
      onClick={() => alert(`thanks to ${children}`)}
    >
      {children}
    </button>
  )
}

// // MDX에 전달 - Button, CodeBlock
const components = { Button, CodeBlock }

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  )
}
