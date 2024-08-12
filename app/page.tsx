import { FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import ShopItem from "./_components/shop-item"

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
          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/cabelo.svg"} width={16} height={16} alt="cabelo" />
            Cabelo
          </Button>
          <Button className="gap-2" variant={"secondary"}>
            <Image src={"/barba.svg"} width={16} height={16} alt="barba" />
            Barba
          </Button>
          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/acabamento.svg"}
              width={16}
              height={16}
              alt="acabamento"
            />
            Acabamento
          </Button>
          <Button className="gap-2" variant={"secondary"}>
            <Image
              src={"/sobrancelha.svg"}
              width={16}
              height={16}
              alt="sobrancelha"
            />
            Sobrancelha
          </Button>
          <Button className="gap-2" variant={"secondary"}>
            <FootprintsIcon size={16} />
            Pezinho
          </Button>
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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia Celestino</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">12</p>
              <p className="text-sm">09:00</p>
            </div>
          </CardContent>
        </Card>
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
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-xs text-gray-400">
              © 2024 Copyright <span className="font-bold">MarcaFlex</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
