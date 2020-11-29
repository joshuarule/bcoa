import React from "react";
import {graphql} from 'gatsby';
import Img from 'gatsby-image';
import SEO from "../components/SEO";
import Layout from '../components/Layout'
import useContactMetadata from "../components/ContactMetadata"

export const ContactPageTemplate = ({ data }) => {
  const pageFields = data.mdx.frontmatter;
  const {address, email, phone, instagram} = useContactMetadata();
  return (
    <div className="container
                    marginBottom-15
                    bp-1_marginBottom-17">
      <SEO
        postImage={pageFields.seo.image ? pageFields.seo.image.childImageSharp.fluid.src : null}
        postData={pageFields}
      />
      <h1 className=" f-page-title
                      paddingTop-7 marginBottom-7
                      bp-1_paddingTop-11
                      bp-2_paddingTop-17 bp-2_marginBottom-12">
        { pageFields.title }
      </h1>
      <div className="marginBottom-6
                      bp-1_marginBottom-8
                      bp-2_marginBottom-15" >
        {pageFields.heroImage.image && 
          <Img fluid={pageFields.heroImage.image.childImageSharp.fluid} alt={pageFields.heroImage.alt}/>
        }
      </div>
      
      <div className="f-display-copy
                      bp-1_grid-12col
                      bp-2_marginBottom-50">
        <p className="marginBottom-7
                      bp-1_colSpan-6
                      bp-2_offset-right-1">
          { pageFields.message }
        </p>
        <div className="bp-1_colSpan-6 bp-1_offset-left-1">
          <a className="defaultLink" href="https://goo.gl/maps/cxWiP9aLg6v" target="_blank" rel="noopener noreferrer">
            <address>
              {address.street}
              {" "}
              <br />
              {address.street2}
              <br />
              {address.city}, {address.state}{" "}
              {address.zip}
              <br />
            </address>
          </a>
          <p>&#8212;</p>
          <a className="defaultLink" href={`mailto:${ email }`}>{ email }</a>
          <br/>
          <a className="defaultLink" href={`tel:${ phone }`}>{ phone }</a>
          <p>&#8212;</p>
          <a href={`http://instagram.com/${instagram}`} target="_blank" className="defaultLink" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactPage = (props) => {
  return (
    <Layout 
      {...props} 
      render={(ref, breakpoint) => <ContactPageTemplate data={props.data} breakpoint={breakpoint} intersectionRef={ref} /> } 
    />
  )
}

export default ContactPage;

export const query = graphql`
  query ContactPageQuery {
    mdx(fields: {slug: {eq: "/contact/"}}) {
      id
      body
      frontmatter {
        title
        seo {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        message
        heroImage {
          image {
            childImageSharp {
              fluid(maxWidth: 3800, quality: 75) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
        }
      }
    }
  }
`;
