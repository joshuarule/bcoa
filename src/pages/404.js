import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage = (props) => (
  <Layout {...props} render={() => 
    <>
    <SEO />
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
    </>
  }/>
)

export default NotFoundPage
