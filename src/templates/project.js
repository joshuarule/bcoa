import React from "react";
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Img from 'gatsby-image';
import Layout from '../components/Layout'
import ProjectImage from "../components/ProjectImage";
import MediaQuery from 'react-responsive';
import SEO from "../components/SEO";

const ProjectTemplate = ({ data, intersectionRef }) => {
  // console.log(intersectionRef);
  const post = data.mdx;
  const fields = post.frontmatter;
  return (
      <div className="bp-2_marginBottom-15">
        <SEO
          postImage={fields.seo && fields.seo.image ? fields.seo.image.childImageSharp.fluid.src : fields.previewImage.image ? fields.previewImage.image.childImageSharp.fluid.src : null}
          postData={{
            slug: post.fields.slug,
            seo: {
              title: fields.seo && fields.seo.title ? fields.seo.title : fields.title,
              description: fields.seo && fields.seo.description ? fields.seo.description : fields.headline
            }
          }}
        />
        <div className="container
                        bp-1_paddingTop-2 bp-2_paddingTop-5
                        bp-1_marginBottom-3 bp-2_marginBottom-6">
          <div className="project-name">
            <h2 className='f-page-title'>{fields.title}</h2>
          </div>
        </div>
        <div ref={intersectionRef}>

          <MediaQuery orientation={'portrait'} maxWidth={1224}>
            {(matches) => {
              if (matches && fields.heroImage && fields.heroImage.portraitImage) {
                return (
                  <Img 
                    
                    className="projectHero" 
                    fluid={ fields.heroImage.portraitImage.childImageSharp.fluid }
                    alt={fields.heroImage.alt}
                  />
                )
              } else if (fields.heroImage && fields.heroImage.image) {
                return (
                  <Img 
                    className="projectHero" 
                    fluid={ fields.heroImage.image.childImageSharp.fluid }
                    alt={fields.heroImage.alt} 
                  />
                )
              } else {
                return null
              }
            }}
          </MediaQuery>
        </div>
        
        <div className="container marginTop-5 bp-1_marginTop-10 bp-2_marginTop-30">
          <div className="bp-1_grid-12col">
            <div className="colSpan-5">
              <h1 className='f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-9'>
                {fields.headline} &#8212;
              </h1>

              <div className="marginBottom-5 bp-2_marginBottom-10">
                <MDXRenderer>{post.body}</MDXRenderer>
              </div>

              {fields.infoObject && fields.infoObject.length && (
                <div className="infoObjects">
                  <dl className='bp-1_grid-2col marginBottom-8 bp-1_marginBottom-13 bp-2_marginBottom-24'>
                    {fields.infoObject.map((item, i) => (
                      <div key={`infoObject-${i}`} className='marginBottom-4 bp-2_marginBottom-6'>
                        <dt className="f-credit">{item.title}</dt>
                        <dd className="f-caption">{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
            <div className="colSpan-1"></div>
            {fields.primaryImage && 
              <div className={`project-primaryImage colSpan-6 bp-1_marginTop-1 bp-2_marginTop-3`}>
                <ProjectImage className={fields.projectGallery[0] && fields.projectGallery[0].colWidth > 6 ? '' : 'absolute'} key='primary-image' imageData={fields.primaryImage} />
              </div>
            }
          </div>
          <div>
            {fields.projectGallery && fields.projectGallery.length &&
              <div className="project-images bp-1_grid-12col">
                {fields.projectGallery.map((imageData, i) => {
                  return (
                    imageData.type === 'image'
                    ?

                        <ProjectImage key={i} index={i} imageData={ imageData } />
                      :
                        <blockquote key={i} className=" project-blockquote colSpan-12 bp-1_colSpan-11 t-center f-headline-b 
                                                        marginTop-12 marginBottom-12
                                                        bp-1_marginTop-7 bp-1_marginBottom-14
                                                        bp-2_marginTop-14 bp-2_marginBottom-30"
                        >
                      {imageData.pullQuote}
                    </blockquote>
                  )
                })}
              </div>
            }
          </div>
          
        </div>
      </div>
  );
};

const ProjectPage = (props) => {
  return (
    <Layout {...props} render={(ref) => <ProjectTemplate data={props.data} intersectionRef={ref} /> }/>
  )
}

export default ProjectPage

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
    mdx(fields: {slug: {eq: $slug } }) {
      fields {
        slug
      }
      id
      body
      frontmatter {
        title
        headline
        infoObject {
          title
          description
        }
        previewImage {
          image {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        heroImage {
          image {
            childImageSharp {
              fluid(maxWidth: 3848, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          portraitImage {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        primaryImage {
          image {
            childImageSharp {
              fluid(maxWidth: 1820, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          alt
          caption
        }
        projectGallery {
          type
          image {
            childImageSharp {
              fluid(maxWidth: 3800, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          colWidth
          offsetWidth
          alt
          caption
          pullQuote
        }
      }
    }
  }
`;
