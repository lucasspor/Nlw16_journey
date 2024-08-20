import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-steps'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModal, setIsConfirmTripModal] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'antonio.jose@gmail.com',
    'jose@acme.com'
  ])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return alert('Por favor preencha o email')
    }

    if (emailsToInvite.includes(email)) {
      return alert('Este email já esta cadastrado')
    }

    setEmailsToInvite([
      ...emailsToInvite, email
    ])

    event.currentTarget.reset()
  }


  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModal(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModal(false)
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3' >
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className='space-y-4'>

          <DestinationAndDateStep 
          closeGuestsInput={closeGuestsInput} 
          isGuestsInputOpen={isGuestsInputOpen}
          openGuestsInput={openGuestsInput}/>

          {isGuestsInputOpen && (
            <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestsModal={openGuestsModal} />
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal 
      emailsToInvite={emailsToInvite} 
      addNewEmailToInvite={addNewEmailToInvite} 
      closeGuestsModal={closeGuestsModal}
      removeEmailToInvite={removeEmailToInvite}
      />)}

      {isConfirmTripModal && (
       <ConfirmTripModal  closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip}/>
      )
      }
    </div>
  )
}
