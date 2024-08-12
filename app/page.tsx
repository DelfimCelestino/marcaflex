import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Delfim!</h2>
        <p>Segunda-feira, 12 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faca sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src={"/banner-01.png"}
            fill
            className="rounded-xl object-cover"
            alt="Agende os melhores com o MarcaFlex"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
