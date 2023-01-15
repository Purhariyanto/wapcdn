import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDes = data.site.siteMetadata.description

  return (
    <Layout location={location} title={siteTitle} des={siteDes}>
      <hr />
      <div className="text-center m-14">
        <h1>404: Not Found</h1>
        <div className="text-gray-700">You just hit a route that doesn&#39;t exist... the sadness.</div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
