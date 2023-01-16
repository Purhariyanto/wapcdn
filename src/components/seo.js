import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  description,
  title,
  imageUrl,
  url,
  type,
  json,
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            author
          }
        }
      }
    `
  )
      console.log(json);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@WapPur" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={url} />
      {json && (
        <script type="application/ld+json">
          {JSON.stringify(json)}
        </script>
      )}
      {children}
    </>
  )
}

export default Seo
