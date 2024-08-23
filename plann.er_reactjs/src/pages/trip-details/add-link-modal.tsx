import { Link2, Tag, X } from "lucide-react";

interface AddLinkModalProps{
  closeAddLinkModal: () => void
}


export function AddLinkModal({closeAddLinkModal}: AddLinkModalProps){
  return (
    <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
    <div className="w-[580px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Cadastrar link</h2>
          <button onClick={closeAddLinkModal} aria-label='Abrir e Fechar Modal'><X className='size-5 text-zinc-400' /></button>
        </div>
        <p className="text-sm text-zinc-400">Todos convidados podem visualizar os links importantes.</p>
      </div>
      <form className="space-y-3">
        <div className="space-y-2 ">
          <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Tag className="text-zinc-400 size-5 shrink-0" />
            <input name="activity" placeholder="Título do link" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full flex-1" />
          </div>
          <div className="flex gap-2  flex-1 items-center px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Link2 className="text-zinc-400 size-5 shrink-0" />
            <input name="activity" placeholder="URL" className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full flex-1" />
          </div>
        </div>

        <button className="bg-lime-300 text-lime-950 text-base rounded-lg px-5 py-3 font-medium flex items-center justify-center gap-2 w-full tx hover:bg-lime-400">Salvar link</button>
      </form>
    </div>
  </div>
  )
}