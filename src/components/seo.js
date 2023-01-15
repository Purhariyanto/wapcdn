import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, imageUrl, url, type, datePub, children }) => {
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

  const jsonldArticle = {
    '@context': 'http://schema.org',
    '@type': `${type}`,
    'description': `${description}`,
    'image': {
        '@type': 'ImageObject',
        'url': `${imageUrl}`
    },
    'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${site.siteMetadata.siteUrl}`
     },
    'inLanguage': 'id',
    'name': `${title}`,
    'headline': `${title}`,
    'url': `${url}`,
    'datePublished': `${datePub}`,
    'dateModified': `${datePub}`,
    'author': {
        '@type': 'Person',
        'name': `${site.siteMetadata.author}`,
        'url': `${site.siteMetadata.siteUrl}`
    },
    'publisher' : {
        '@type': 'Organization',
        'name': `${site.siteMetadata.author}`,
        'logo': {
            '@type': 'ImageObject',
            'url': `https://wappur.my.id/icons/icon-512x512.png`
        }
    }
  }
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
        <script type="application/ld+json">
          {JSON.stringify(jsonldArticle)}
        </script>
        {children}
    </>
  )
}

export default Seo