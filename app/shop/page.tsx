import Header from "../_components/header"
import Search from "../_components/search"
import ShopItem from "../_components/shop-item"
import { db } from "../_lib/prisma"

interface ShopsProps {
  searchParams: {
    search?: string
  }
}

const Shops = async ({ searchParams }: ShopsProps) => {
  const shops = await db.shop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados paara &quot;{searchParams?.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {shops.map((shop) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shops
