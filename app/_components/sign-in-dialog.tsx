"use client"
import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <>
      <DialogHeader>
        <DialogTitle>Olá! Faça seu login na plataforma!</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button onClick={handleLoginWithGoogleClick} variant={"outline"}>
        Iniciar Sessão com google
      </Button>
    </>
  )
}

export default SignInDialog
