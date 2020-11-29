import { graphql, useStaticQuery } from 'gatsby'

const useContactMetadata = () => {
  const { contactJson } = useStaticQuery(
    graphql`
      query CONTACT_METADATA_QUERY {
        contactJson {
          address {
            street
            street2
            city
            state
            zip
          }
          phone
          email
          instagram
        }
      }
    `
  )
  return contactJson
}

export default useContactMetadata
