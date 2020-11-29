import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { settingsJson } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        settingsJson {
          siteTitle
          siteDescription
          url
          siteImage {
            childImageSharp {
              fixed(width: 1200) {
                src
              }
            }
          }
          menuBackground {
            childImageSharp {
              fixed(width: 1820) {
                src
              }
            }
          }
        }
      }
    `
  )
  return settingsJson
}

export default useSiteMetadata
