import { useEffect, useRef } from "react"

const Adsense = () => {
  const scrolled = useRef(null)

  useEffect(() => {
    const headID = document.getElementsByTagName("head")[0]

    document.addEventListener("scroll", function (e) {
      if (!scrolled.current) {
        scrolled.current = true
        const gaScript = document.createElement("script")
        gaScript.async = true
        gaScript.crossorigin = "anonymous"
        gaScript["data-ad-client"] = "ca-pub-5738026098468973"
        gaScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        gaScript.type = "text/javascript"
        headID.appendChild(gaScript)

        // const gtScript = document.createElement("script")
        // gtScript.async = true
        // gtScript.src = "https://www.googletagmanager.com/gtag/js?id=G-FCJLCZFKB6"
        // gtScript.type = "text/javascript"
        // headID.appendChild(gtScript)

        // const gtConfig = document.createElement("script")
        // gtConfig.text = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-FCJLCZFKB6');`
        // headID.appendChild(gtConfig)
      }
    })
  }, [])
}

export default Adsense
