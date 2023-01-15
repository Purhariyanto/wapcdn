import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const siteDes = data.site.siteMetadata?.description
  const menuTop = data.site.siteMetadata?.menuTop
  const menuBot = data.site.siteMetadata?.menuBot
  const { currentPage, numPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPage
  const prevPage = currentPage - 1 === 1 ? "/" : "/p/" + (currentPage - 1).toString()
  const nextPage = "/p/" + (currentPage + 1).toString()
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout
      location={location}
      title={siteTitle}
      des={siteDes}
      menuTop={menuTop}
      menuBot={menuBot}
    >
    
      {posts.map(post => {
        const { title, date, img, tags } = post.frontmatter
        const image = img.childImageSharp.gatsbyImageData
        if (JSON.stringify(tags) === JSON.stringify(["Page"])) return null
        return (
          <section
            className="bg-white"
            key={post.fields.slug}
            itemScope
            itemType="http://schema.org/Article"
          >
            <div className="mx-auto">
              <div className="grid grid-cols-1 sm:grid-rows-1">
                <div className="sm:flex shadow-md hover:shadow-lg border border-gray-100 p-3 rounded-xl mt-3 mx-4 sm:mx-2">
                  <div className="sm:w-96 sm:my-auto">
                    <GatsbyImage
                      className="object-cover w-full rounded-lg"
                      image={image}
                      alt={title}
                    />
                  </div>

                  <div className="flex flex-col justify-between sm:ml-6">
                    <h2 className="mt-4 sm:mt-0">
                      <Link to={post.fields.slug} itemProp="url">
                        <span
                          className="text-xl font-semibold  text-gray-800 "
                          itemProp="headline"
                        >
                          {title}
                        </span>
                      </Link>
                    </h2>
                    <span className="text-sm text-gray-500 pb-3 text-justify">
                      {post.excerpt}
                    </span>

                    <span className="text-sm text-gray-500">
                      {" "}
                      <time>{date}</time>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
      <div className="flex flex-row p-3 my-2 rounded-xl">
        {!isFirst && (
          <div className="flex-1">
            <Link to={prevPage} rel="prev">
              <div className="inline-block shadow-lg text-white px-4 py-2 bg-blue-600 rounded-xl text-base font-bold hover:bg-yellow-600">
                <span className="items-center text-[2em]">← </span> Previous
              </div>
            </Link>
          </div>
        )}
        {!isLast && (
          <div className="flex-1">
            <Link to={nextPage} rel="next">
              <div className="shadow-lg text-white px-4 py-2 bg-blue-600 rounded-xl text-base font-bold hover:bg-yellow-600 float-right">
                Next <span className="items-center text-[2em]"> →</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const Head = ({ data: { site } }) => {
  return (
    <Seo
    title={site.siteMetadata?.title}
    description={site.siteMetadata?.description}
    imageUrl={site.siteMetadata?.imgLogo}
    url={site.siteMetadata?.siteUrl}
    type="website"
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        imgLogo
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD-MM-YYYY")
          title
          description
          img {
            childImageSharp {
              gatsbyImageData(width: 300, placeholder: BLURRED, formats: AUTO)
            }
          }
          tags
        }
      }
    }
  }
`
