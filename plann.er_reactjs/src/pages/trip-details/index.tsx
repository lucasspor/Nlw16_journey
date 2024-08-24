import {  Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { AddLinkModal } from "./add-link-modal";
import { ImportantLink } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDate } from "./destination-and-date";

export function TripDetailsPage() {
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



  return (

    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
     <DestinationAndDate/>
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-zinc-50 font-bold">Atividades</h2>
            <button onClick={openCreateActivityModal} className="rounded-md flex gap-2 px-5 py-2 bg-lime-300 text-lime-950 font-medium ">
              <Plus /> Cadastrar atividade
            </button>
          </div>
          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLink openAddLinkModal={openAddLinkModal} />
          <div className="w-full h-px bg-zinc-800"></div>
          <Guests />
        </div>
      </main>
      {isCreateActivityModal && (
        <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
      )
      }
      {isAddLinkModal && (
        <AddLinkModal closeAddLinkModal={closeAddLinkModal} />
      )
      }
    </div>
  )
}