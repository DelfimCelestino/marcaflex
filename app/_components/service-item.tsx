"use client"

import { Booking, Shop, ShopServices } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, isSameDay, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

interface ServiceItemProps {
  service: ShopServices
  shop: Shop
}

const TIME_LIST = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
]

const getTimeList = (bookings: Booking[], selectedDay: Date) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    const isToday = isSameDay(selectedDay, new Date())

    const isTimeInPast = isToday && time < format(new Date(), "HH:mm")

    return !hasBookingOnCurrentTime && (!isToday || !isTimeInPast)
  })
}

const ServiceItem = ({ service, shop }: ServiceItemProps) => {
  const { data } = useSession()

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [daysBookings, setDaysBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!selectedDay) return
    const fetch = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDaysBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingClick = () => {
    if (!data?.user) {
      setSignInDialogIsOpen(true)
      return
    }
    setBookingSheetIsOpen(!bookingSheetIsOpen)
  }

  const handleSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setBookingSheetIsOpen(!bookingSheetIsOpen)
    setDaysBookings([])
  }

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    if (!selectedDay || !selectedTime) return
    try {
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })
      await createBooking({
        serviceId: service.id,
        date: newDate,
      })

      toast.success("Reserva efetuada com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao reservar")
    }
  }

  return (
    <>
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
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleSheetOpenChange}
              >
                <Button
                  onClick={handleBookingClick}
                  variant="secondary"
                  size={"sm"}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      fromDate={new Date()}
                      selected={selectedDay}
                      onSelect={handleSelectDate}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-4 overflow-x-auto border-b border-solid p-3 [&::-webkit-scrollbar]:hidden">
                      {getTimeList(daysBookings, selectedDay).map((time) => (
                        <Button
                          onClick={() => handleTimeSelect(time)}
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full border-none"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "MZN",
                              }).format(Number(service.price))}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horario</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">
                              Estabelcimento
                            </h2>
                            <p className="text-sm">{shop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button
                        disabled={!selectedDay || !selectedTime}
                        onClick={handleCreateBooking}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
