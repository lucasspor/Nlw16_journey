import { CircleDashed, CircleCheck, UserCog } from "lucide-react";
import { Button } from "../../components/button";


export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="text-zinc-50 text-xl font-semibold">Convidados</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1 5">
            <span className="block font-medium text-zinc-100">Jessica White</span>
            <span className="block text-sm text-zinc-400 truncate">jessica.white44@yahoo.com</span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1 5">
            <span className="block font-medium text-zinc-100">Dr. Rita Pacocha</span>
            <span className="block text-sm text-zinc-400 truncate">lacy.stiedemann@gmail.com</span>
          </div>
          <CircleCheck className="text-lime-300 size-5 shrink-0" />
        </div>
      </div>
     
      <Button variant="secondary" size="full">
      <UserCog className="size-5" />Gerenciar convidados
      </Button>
    </div>
  )
}