import { ShopServices } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: ShopServices
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* DIREITA */}
        <div className="w-full space-y-3">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "MZN",
              }).format(Number(service.price))}
            </p>
            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
