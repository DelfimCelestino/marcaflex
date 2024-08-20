import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
// import { Avatar, AvatarImage } from "./ui/avatar"
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

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        <h2 className="text-lg font-bold">Ola, faca seu login!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"}>
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faca login na plataforma!</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta Google.
              </DialogDescription>
            </DialogHeader>
            <Button variant={"outline"}>Iniciar Sessão com google</Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage src="https://github.com/delfimcelestino.png" />
        </Avatar>
        <div>
          <p className="font-bold">Delfim Celestino</p>
          <p className="text-xs">denycelestino21@gmail.com</p>
        </div> */}
      </div>

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
        <Button variant={"ghost"} className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
