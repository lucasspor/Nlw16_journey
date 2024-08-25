import { Calendar, Clock, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}


export function CreateActivityModal({ closeCreateActivityModal }: CreateActivityModalProps) {
  const {tripId} = useParams()

  function createActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const date_at = data.get('date')?.toString()
    const hours_at = data.get('hours')?.toString()

    const occurs_at = `${date_at}T${hours_at}`

    console.log(occurs_at)

    api.post(`/trips/${tripId}/activities`,{
      title, 
      occurs_at
    })

    window.document.location.reload()
  }
  return (
    <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
      <div className="w-[580px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal} aria-label='Abrir e Fechar Modal'><X className='size-5 text-zinc-400' /></button>
          </div>
          <p className="text-sm text-zinc-400">Todos convidados podem visualizar as atividades.</p>
        </div>
        <form onSubmit={createActivity} className="space-y-3">
          <div className="space-y-2 ">
            <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Tag className="text-zinc-400 size-5 shrink-0" />
              <input name="title" placeholder="Qual a atividade?" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full flex-1" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Calendar className="text-zinc-400 size-5 shrink-0" />
                <input type="date" name="date" placeholder="Data e Horário da atividade" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full " />
              </div>
              <div className="flex gap-2 w-36 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                <Clock className="text-zinc-400 size-5 shrink-0" />
                <input type="time" name="hours" placeholder="Horário" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full [color-scheme:  #09090b] " />
              </div>
            </div>
          </div>

          <Button size='full'>
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}