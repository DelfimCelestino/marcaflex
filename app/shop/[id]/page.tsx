import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ShopPageProps {
  params: {
    id: string
  }
}

const ShopPage = async ({ params }: ShopPageProps) => {
  //chamando os dados da barbearia
  const shop = await db.shop.findUnique({
    where: { id: params.id },
    include: { ShopServices: true },
  })

  if (!shop) {
    return notFound()
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={shop?.imageUrl}
          fill
          alt={shop?.name}
          className="object-cover"
        />
        <Button
          asChild
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
        >
          <Link href={"/"}>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{shop?.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{shop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 | 499 avaliações</p>
        </div>
      </div>

      {/* DESCRICAO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="font-bol text-xs uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{shop?.description}</p>
      </div>
      {/* 
SERVICOS */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="font-bol text-xs uppercase text-gray-400">Serviço</h2>
        <div className="space-y-3">
          {shop?.ShopServices.map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
        </div>
      </div>

      {/* CONTACTO */}
      <div className="space-y-3 p-5">
        <h2 className="font-bol text-xs uppercase text-gray-400">Contactos</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SmartphoneIcon />
            <p className="text-sm">{shop.phone}</p>
          </div>
          <Button asChild variant={"outline"} size={"sm"}>
            <Link href={`tel:${shop.phone}`}>Ligar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
