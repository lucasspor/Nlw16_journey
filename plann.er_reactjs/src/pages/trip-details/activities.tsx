import { CircleCheck, CircleDashed } from "lucide-react";


export function Activities(){
  return(
    <div className="space-y-8">
    <div className="space-y-3">
      <div className="flex gap-2 items-baseline">
        <span className="text-zinc-300 text-xl ">Dia 17</span>
        <span className="text-zinc-500 text-xs">Sábado</span>
      </div>
      <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
    </div>
    <div className="space-y-3">
      <div className="flex gap-2 items-baseline">
        <span className="text-zinc-300 text-xl ">Dia 18</span>
        <span className="text-zinc-50 text-xs">Sábado</span>
      </div>
      <div className="space-y-2.5">
        <div className="px-4 py-3 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
          <CircleCheck className="size-5 text-lime-300" />
          <span className="text-zinc-100">Academia em grupo</span>
          <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
        </div>
        <div className="px-4 py-3 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
          <CircleDashed className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Almoço</span>
          <span className="text-zinc-400 text-sm ml-auto">10:00h</span>
        </div>
      </div>
    </div>
  </div>
  )
}