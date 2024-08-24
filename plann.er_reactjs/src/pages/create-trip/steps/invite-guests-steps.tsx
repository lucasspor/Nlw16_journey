import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepPros {
  openGuestsModal: () => void
  openConfirmTripModal: () => void
  emailsToInvite: string[]

}

export function InviteGuestsStep({ openGuestsModal, emailsToInvite, openConfirmTripModal }: InviteGuestsStepPros) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type='button' onClick={openGuestsModal} className='flex gap-2 items-center flex-1'>
        <UserRoundPlus className='size-5 text-zinc-400' />

        {
          emailsToInvite.length > 0 ?
            (<span className='text-lg text-zinc-400 flex-1 text-left w-full'>{emailsToInvite.length} pessoa(s) convidada(s)</span>) :
            (<span className='text-lg text-zinc-400 flex-1 text-left w-full'>Quem estrá na viagem?</span>)
        }

      </button>

      <div className='w-px h-6 bg-zinc-800'></div>

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className='size-5' />
      </Button>
    </div>)
}