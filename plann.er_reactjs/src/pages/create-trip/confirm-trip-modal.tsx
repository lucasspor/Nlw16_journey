import { User, Mail, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({ closeConfirmTripModal, createTrip }: ConfirmTripModalProps) {
  return (
    <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
      <div className="w-[580px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Confirmar Criação de viagem</h2>
            <button onClick={closeConfirmTripModal} aria-label='Abrir e Fechar Modal'><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className='text-zinc-100 font-bold'>Florianópolis, Brasil</span> nas datas de <span className='text-zinc-100 font-bold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
        </div>
        <div className="w-full h-px bg-zinc-800"></div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="space-y-2 ">
            <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <User className="text-zinc-400 size-5" />
              <input name="name" placeholder="Seu nome completo" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full flex-1" />
            </div>
            <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Mail className="text-zinc-400 size-5" />
              <input type="email" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full" />
            </div>
          </div>
          <Button size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}