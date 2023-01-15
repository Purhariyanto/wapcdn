import * as React from "react"
import { Link } from "gatsby"

const Menu = () => {
  const menuBot = [
    {
      name: `Disclaimer`,
      slug: `/page/disclaimer/`,
    },
    {
      name: `Privacy Policy`,
      slug: `/page/privacy/`,
    },
    {
      name: `Terms & Conditions`,
      slug: `/page/tc/`,
    },
  ]
  return (
    <>
      <div className="mx-2">
        <div className="w-full flex justify-center text-sm sm:text-base gap-4 my-6">
          {menuBot.map((menu, i) => {
            return (
              <div
                className="bg-gray-700 p-2 shadow-md rounded-xl hover:bg-yellow-600"
                key={i}
              >
                <Link
                  className="text-sm font-bold text-white"
                  to={menu.slug}
                  rel="nofollow noindex"
                >
                  {menu.name}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Menu
