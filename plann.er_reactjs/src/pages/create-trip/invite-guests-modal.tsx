import { AtSign, X, Plus } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailToInvite: (email: string) => void
}


export function InviteGuestsModal({
  addNewEmailToInvite,
  closeGuestsModal,
  emailsToInvite,
  removeEmailToInvite }: InviteGuestsModalProps) {
  return (
    <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
            <button onClick={closeGuestsModal} aria-label='Abrir e Fechar Modal'><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map(email => {
            return (
              <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">{email}</span>
                <button type="button">
                  <X className="text-zinc-400 size-4" onClick={() => removeEmailToInvite(email)} />
                </button>
              </div>
            )
          })}
        </div>
        <div className="w-full h-px bg-zinc-800"></div>
        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex gap-2 items-center">
          <div className="flex gap-2 flex-1 items-center">
            <AtSign className="text-zinc-400 size-5" />
            <input type="text" name="email" placeholder="Digite o email do convidado?" className="bg-transparent text-lg placeholder-zinc-400 outline-none w-52 flex-1" />
          </div>
          <Button>
            Convidar<Plus className='size-5' />
          </Button>
        </form>
      </div>
    </div>
  )
}