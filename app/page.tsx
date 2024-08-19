import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { db } from "./_lib/prisma"
import ShopItem from "./_components/shop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"

const Home = async () => {
  const shops = await db.shop.findMany({})
  const popularShops = await db.shop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Delfim!</h2>
        <p>Segunda-feira, 12 de agosto.</p>

        {/* BUSCA */}

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua Busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RAPIDA */}

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant={"secondary"}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt="cabelo"
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* 
IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={"/banner-01.png"}
            fill
            className="rounded-xl object-cover"
            alt="Agende os melhores com o MarcaFlex"
          />
        </div>

        {/* AGENDAMENTO */}

        <BookingItem />

        {/* RECOMENDADOS */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {shops.map((shop) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>

        {/* Populares */}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularShops.map((shop) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
