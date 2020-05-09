const path = require('path');
const { graphql } = require('gatsby');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // The “graphql” function allows us to run arbitrary
  // queries against the local Contentful graphql schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )
  .then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create Product pages
    const postTemplate = path.resolve(`./src/templates/post.js`)
    result.data.allContentfulBlogPost.edges.forEach(edge => {
      createPage({
        path: `/posts/${edge.node.slug}/`,
        component: postTemplate,
        context: {
          slug: edge.node.slug,
        },
      })
    })
  });
}
