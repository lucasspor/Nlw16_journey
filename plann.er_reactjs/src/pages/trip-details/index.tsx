import { Calendar, CircleCheck, CircleDashed, Link2, MapPin, Plus, Settings2, UserCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateActivityModal } from "./create-activity-maodal";
import { AddLinkModal } from "./add-link-modal";

export function TripDetailsPage() {
  const navigate = useNavigate()

  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false)
  const [isAddLinkModal, setIsAddLinkModal] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModal(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModal(false)
  }

  function openAddLinkModal() {
    setIsAddLinkModal(true)
  }

  function closeAddLinkModal() {
    setIsAddLinkModal(false)
  }

  function changeDateAndPlace() {
    navigate('/')
  }

  return (

    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Florianópolis, Brasil</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>
          <div className="w-px h-6 bg-zinc-800"></div>
          <button onClick={changeDateAndPlace} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Alterar local/data <Settings2 className="size-5 text-zinc-400" />
          </button>
        </div>
      </div>
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-zinc-50 font-bold">Atividades</h2>
            <button onClick={openCreateActivityModal} className="rounded-md flex gap-2 px-5 py-2 bg-lime-300 text-lime-950 font-medium ">
              <Plus /> Cadastrar atividade
            </button>
          </div>
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
        </div>
        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <h2 className="text-zinc-50 text-xl font-semibold">Links importantes</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1 5">
                  <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate">https://www.airbnb.com.br/rooms/104700011</a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1 5">
                  <span className="block font-medium text-zinc-100">Regras da casa</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate">https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000</a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>
            <button onClick={openAddLinkModal} className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
              <Plus className="size-5" />Cadastrar novo link</button>
          </div>
          <div className="w-full h-px bg-zinc-800"></div>
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
            <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
              <UserCog className="size-5" />Gerenciar convidados</button>
          </div>
        </div>
      </main>
      {isCreateActivityModal && (
       <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal}/>
      )
      }
      {isAddLinkModal && (
       <AddLinkModal closeAddLinkModal={closeAddLinkModal}/>
      )
      }
    </div>
  )
}