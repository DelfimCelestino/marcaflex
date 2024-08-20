"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src={data?.user?.image ?? ""} />
          </Avatar>
          <div>
            <p className="font-bold">{data.user.name}</p>
            <p className="text-xs">{data.user.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          <h2 className="text-lg font-bold">Olá! Faça seu login</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"icon"}>
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Olá! Faça seu login na plataforma!</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta Google.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleLoginWithGoogleClick} variant={"outline"}>
                Iniciar Sessão com google
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button asChild variant={"ghost"} className="justify-start gap-2">
            <Link href={"/"}>
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>
        <Button variant={"ghost"} className="justify-start gap-2">
          <CalendarIcon size={18} /> Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            variant={"ghost"}
            className="justify-start gap-2"
          >
            <Image
              src={option.imageUrl}
              alt={option.title}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-2 py-5">
        <Button
          onClick={handleLogoutClick}
          variant={"ghost"}
          className="justify-start gap-2"
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
