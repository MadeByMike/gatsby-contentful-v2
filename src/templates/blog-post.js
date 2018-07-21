import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import styles from './blog-post.module.css'

export default ({ data }) => {
  const post = get(data, 'contentfulBlogPost')
  const siteTitle = get(data, 'site.siteMetadata.title')

  return (
    <div style={{ background: '#fff' }}>
      <Helmet title={`${post.title} | ${siteTitle}`} />
      <div className="wrapper">
        <div className={styles.hero}>
          <img
            src={`${post.heroImage.file.url}?w=1180&h=400&fit=fill`}
            alt=""
          />
        </div>
        <h1 className="section-headline">{post.title}</h1>
        <p
          style={{
            display: 'block',
          }}
        >
          {post.publishDate}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        file {
          url
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
