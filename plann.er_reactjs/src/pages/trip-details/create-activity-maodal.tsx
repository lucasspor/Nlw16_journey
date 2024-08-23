import { Clock, Mail, Tag, X } from "lucide-react";

interface CreateActivityModalProps{
  closeCreateActivityModal: () => void
}


export function CreateActivityModal({ closeCreateActivityModal}: CreateActivityModalProps){
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
      <form className="space-y-3">
        <div className="space-y-2 ">
          <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Tag className="text-zinc-400 size-5 shrink-0" />
            <input name="activity" placeholder="Qual a atividade?" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full flex-1" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Mail className="text-zinc-400 size-5 shrink-0" />
              <input type="date" name="day" placeholder="Data e Horário da atividade" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full " />
            </div>
            <div className="flex gap-2 w-36 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Clock className="text-zinc-400 size-5 shrink-0" />
              <input type="time" name="time" placeholder="Horário" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full [color-scheme:  #09090b] " />
            </div>
          </div>
        </div>

        <button className="bg-lime-300 text-lime-950 text-base rounded-lg px-5 py-3 font-medium flex items-center justify-center gap-2 w-full tx hover:bg-lime-400">Salvar atividade</button>
      </form>
    </div>
  </div>
  )
}