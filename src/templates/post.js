import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from 'react-helmet'
import Layout from "../components/layout"
import convertRichText from '../convertRichText';

const PostTemplate = ({ data }) => {
  const { title, content: { json } } = data.contentfulBlogPost
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
      <Helmet title={`${title} | ${siteTitle}`} />

      <h1>{title}</h1>

      <div>
        {convertRichText(json)}
      </div>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      content {
        json
      }
    }
  }
`
