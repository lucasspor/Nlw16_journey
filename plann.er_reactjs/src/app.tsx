import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isGuestsInputOpen, setisGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setisGuestsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'antonio.jose@gmail.com',
    'jose@acme.com'
  ])

  function openGuestsInput() {
    setisGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setisGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setisGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setisGuestsModalOpen(false)
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


  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3' >
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex gap-2 items-center flex-1'>
              <MapPin className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
            </div>
            <div className='flex gap-2 items-center'>
              <Calendar className='size-5 text-zinc-400' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 outline-none w-52" />
            </div>

            <div className='w-px h-6 bg-zinc-800'></div>

            {isGuestsInputOpen ?
              (
                <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">Alterar local/data <Settings2 className='size-5' /></button>
              ) :
              (
                <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">Confirmar viagem <ArrowRight className='size-5' /></button>
              )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type='button' onClick={openGuestsModal} className='flex gap-2 items-center flex-1'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                <span className='text-lg text-zinc-400 flex-1 text-left w-full'>Quem estrá na viagem?</span>
              </button>

              <div className='w-px h-6 bg-zinc-800'></div>

              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem<ArrowRight className='size-5' />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalOpen && (
        <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button onClick={closeGuestsModal}><X className='size-5 text-zinc-400' /></button>
              </div>
              <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email => {
                return (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>
                    <button type="button">
                      <X className="text-zinc-400 size-4" onClick={() => removeEmailFromInvite(email)} />
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
              <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Convidar<Plus className='size-5' />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Confirmar Criação de viagem</h2>
              <button onClick={closeGuestsModal}><X className='size-5 text-zinc-400' /></button>
            </div>
            <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="text-zinc-100">Praia Grande, Brasil</span> nas datas de <span className="text-zinc-100">27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
          </div>
          <div className="w-full h-px bg-zinc-800"></div>
          <form className="space-y-3">
            <div className="space-y-2 ">
              <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <User className="text-zinc-400 size-5" />
                <input name="name" placeholder="Seu nome completo" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-52 flex-1" />
              </div>
              <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Mail className="text-zinc-400 size-5" />
                <input type="email" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-52" />
              </div>
            </div>

            <button className="bg-lime-300 text-lime-950 text-base rounded-lg px-5 py-3 font-medium flex items-center justify-center gap-2 w-full tx hover:bg-lime-400">Confirmar criação da viagem</button>
          </form>
        </div>
      </div>
    </div>
  )
}

