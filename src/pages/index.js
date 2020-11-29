import React, {Component} from 'react'
import { graphql } from 'gatsby'

import Masonry from 'react-masonry-component';
import smoothscroll from 'smoothscroll-polyfill';
import Slider from '../components/Slider';
import SEO from "../components/SEO";

import Layout from '../components/Layout'
import FeaturedProjects from '../components/FeaturedProjects';

class IndexPageTemplate extends Component {

  scrollToFeatured() {
    setTimeout(() => {
      this.content.scrollIntoView({ behavior: "smooth", block: "start", inline: 'nearest'});
    }, 100);
  }

  componentDidMount() {
    smoothscroll.polyfill();
    if (this.props.location && this.props.location.hash === "#featured") this.scrollToFeatured();
  }
  
  componentWillUpdate(nextProps) {
    if (this.props.location && (this.props.location.hash !== nextProps.location.hash) && nextProps.location.hash === "#featured") {
      this.scrollToFeatured();
    }
  }

  render() {
    const {data} = this.props;
    const seo = data.page.frontmatter.seo;
    const projects = data.projects.nodes;
    const featuredProjects = data.page.frontmatter.featuredProjects;
    const featuredProjectsData = featuredProjects.map((title) => {
      return projects.find(project => {
        return project.frontmatter.title === title.project
      })
    })
    return (
      <div>
        <SEO
          postImage={seo.image && seo.image.childImageSharp.fluid.src}
          postData={this.props.data.page.frontmatter}
        />
        <div
          ref={this.props.intersectionRef}
        >
          <Slider
            intersectionRef={this.props.intersectionRef}
            className="hero" 
            slides={ this.props.data.page.frontmatter.carouselImages } 
          />
        </div>
        <div ref={(el) => { if (el) { this.content = el } }} className="container overflow--hidden">
          <h2 className=" f-page-title
                          marginTop-8 marginBottom-7
                          bp-1_marginTop-10
                          bp-2_marginTop-17 bp-2_marginBottom-13">
            { this.props.data.page.frontmatter.title }
          </h2>
          {(this.props.breakpoint === 'large'
            ?
              <Masonry
                className={'masonry'}
                elementType={'ul'}
                options={{ transitionDuration: 0 }}
              >
                <FeaturedProjects projects={featuredProjectsData} />
              </Masonry>
            :
            <FeaturedProjects projects={featuredProjectsData} />
          )}
        </div>
      </div>
    )
  }
}


const IndexPage = (props) => {
  return (
    <Layout {...props} render={(ref, breakpoint) => <IndexPageTemplate data={props.data} breakpoint={breakpoint} intersectionRef={ref} /> } />
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    page: mdx(fields: {slug: {eq: "/index/"}}) {
      id
      frontmatter {
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
        title
        carouselImages {
          alt
          title
          subtitle
          project
          image {
            childImageSharp {
              fluid(maxWidth: 3400, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          portraitImage {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        featuredProjects {
          project
        }
      }
    }
    projects: allMdx(
      filter: { frontmatter: { templateKey: { regex: "/project/" } } }
    ) {
        nodes {
          id
          frontmatter {
            templateKey
            title
            featured {
              isFeatured
              featuredImage {
                isPortrait
                image {
                  childImageSharp {
                    fluid(maxWidth: 1820, quality: 75) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                alt
              }
              featuredDescription
            }
            headline
          }
          fields {
            slug
          }
          excerpt
        }
    }
  }
`
