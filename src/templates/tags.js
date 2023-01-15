import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

const BlogIndex = ({ data, location, pageContext}) => {
  const siteTitle = data.site.siteMetadata?.title
  const siteDes = data.site.siteMetadata?.description
  const menuTop = data.site.siteMetadata?.menuTop
  const menuBot = data.site.siteMetadata?.menuBot
  const posts = data.allMarkdownRemark.nodes
  const { tag } = pageContext
  const tags = "Tutorial " + tag
  return (
    <Layout
      location={location}
      title={siteTitle}
      des={siteDes}
      menuTop={menuTop}
      menuBot={menuBot}
    >
      <h1 className="mx-4 text-2xl -mb-1">{tags}</h1>
      {posts.map(post => {
        const { title, date, img } = post.frontmatter
        const image = img.childImageSharp.gatsbyImageData
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
    </Layout>
  )
}

export const Head = ({ data: { site , allMarkdownRemark: post}, pageContext }) => {
  const siteUrl = site.siteMetadata?.siteUrl
  const { tag } = pageContext
  const tagUrl = (siteUrl + "tags/" + tag + "/").toLowerCase()
  const tags = "Tutorial " + tag
  const des ="Selamat datang di halaman kategori " + tag + " yang membahas seputar " + tag + ", dengan menyajikan informasi yang menarik serta ada gambarnya."
  const image = siteUrl + post.nodes[0].frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src
  
  return (
    <Seo
    title={tags}
    description={des}
    imageUrl={image}
    url={tagUrl}
    type="website"
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        imgLogo
      }
    }
    allMarkdownRemark(
      limit: 10
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
