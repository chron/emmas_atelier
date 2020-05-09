import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulBlogPost.edges

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{siteTitle}</h1>
      {posts.map(({ node }) => {
        return (
          <li key={node.slug}>
            <Link to={`/posts/${node.slug}`}>{node.title} — {node.publishDate}</Link>
          </li>
        )
      })}

    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`
