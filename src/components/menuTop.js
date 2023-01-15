import * as React from "react"
import { Link } from "gatsby"
import AdsTop from "./ads-top"

const Menu = () => {
  const menuTop = [
    {
      name: `Android`,
      slug: `/tags/android/`,
    },
    {
      name: `Linux`,
      slug: `/tags/linux/`,
    },
    {
      name: `Windows`,
      slug: `/tags/windows/`,
    },
  ]
  return (
    <>
      <div className="w-full flex justify-center gap-4 my-6">
        {menuTop.map((menu, i) => {
          return (
            <div
              className="bg-gray-700 p-2 shadow-md rounded-xl hover:bg-yellow-600"
              key={i}
            >
              <Link className="text-sm font-bold text-white" to={menu.slug}>
                {menu.name}
              </Link>
            </div>
          )
        })}
      </div>
      <AdsTop />
    </>
  )
}

export default Menu
