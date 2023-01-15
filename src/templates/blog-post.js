import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import AdsBot from "../components/ads-bot"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post, allMarkdownRemark: p },
  location
}) => {
  const siteTitle = site.siteMetadata?.title
  const siteDes = site.siteMetadata?.description
  const menuTop = site.siteMetadata?.menuTop
  const menuBot = site.siteMetadata?.menuBot
  const posts = p.nodes

  return (

    <Layout
      location={location}
      title={siteTitle}
      des={siteDes}
      menuTop={menuTop}
      menuBot={menuBot}
    >

      <hr className="mb-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <article
        className="w-full p-3"
      >
        <div className="text-center">
          <h1 className="text-2xl text-gray-700 font-bold">
            {post.frontmatter.title}
          </h1>
          <span className="mt-3 text-sm text-gray-700">
            <time>{post.frontmatter.date}</time>
          </span>
        </div>
        <hr className="my-2 -mx-3 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="p-2 mb-6">
          <div className="text-xl text-gray-700 mb-3">Daftar Isi</div>
          <div
            dangerouslySetInnerHTML={{ __html: post.tableOfContents ?? "" }}
          />
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <AdsBot />
      <hr />

      <div className="flex flex-row p-3 my-2 rounded-xl">
        {previous && !previous.fields.slug.match(/(\/)?page\/\S*/) && (
          <div className="flex-1">
            <div className="inline-block text-base font-bold">
              <span className="items-center text-[2em]">← </span>
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            </div>
          </div>
        )}
        {next && !next.fields.slug.match(/(\/)?page\/\S*/) && (
          <div className="flex-1">
            <div className="inline-block text-base font-bold float-right">
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>
              <span className="items-center text-[2em]"> →</span>
            </div>
          </div>
        )}
      </div>
      <hr />

      {posts.map(post => {
        const { title, img } = post.frontmatter
        const image = img.childImageSharp.gatsbyImageData
        return (
          <section
            className="bg-white"
            key={post.fields.slug}
          >
            <div className="mx-auto">
              <div className="flex shadow-md hover:shadow-lg border border-gray-100 p-3 rounded-xl mt-3 mx-2">
                <div className="flex w-3/12 h-24">
                  <GatsbyImage
                    className="object-cover w-full rounded-lg"
                    image={image}
                    alt={title}
                  />
                </div>
                <div className="flex w-9/12 ">
                  <div className="mx-5 my-auto">
                    <Link to={post.fields.slug}>
                      <span
                        className="text-lg font-semibold  text-gray-800"
                      >
                        {title}
                      </span>
                    </Link>
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

export const Head = ({ data: { site, markdownRemark: post } }) => {
  const siteUrl = site.siteMetadata?.siteUrl
  const url = siteUrl + post.fields.slug
  const image = siteUrl + post.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src
  const datePub = post.frontmatter.datePub
  return (
    <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description}
    imageUrl={image}
    url={url}
    type="article"
    datePub={datePub}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        imgLogo
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 5) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          img {
            childImageSharp {
              gatsbyImageData(width: 300, placeholder: BLURRED, formats: AUTO)
            }
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      tableOfContents
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD-MM-YYYY")
        datePub: date(formatString: "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        description
        img {
          childImageSharp {
            gatsbyImageData(width: 600, placeholder: BLURRED, formats: AUTO)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
