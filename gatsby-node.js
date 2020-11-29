const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
//   createTypes(`
//     type Mdx implements Node
//   `);
// };

async function turnProjectsIntoPages({graphql, actions}) {
  const template = path.resolve(`src/templates/project.js`);

  const {data} =  await graphql(`
    query {
      projects: allMdx(filter: {frontmatter: {templateKey: {eq: "project"}, isPublished: {eq: true}}}) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
          }
        }
      }
    }
  `)

  const projects = data.projects.nodes;
  
  projects.forEach(project => {
    actions.createPage({
      path: `/projects${project.fields.slug}`,
      component: template,
      context: {
        id: project.id,
        slug: project.fields.slug,
      },
    })
  })
}

exports.createPages = async (params) => {
  await turnProjectsIntoPages(params);
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  } 
}
