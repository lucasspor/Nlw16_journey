import { Link2, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface ImportantLinkProps {
  openAddLinkModal: () => void
}

interface Link {
  title: string
  url: string
}


export function ImportantLink({ openAddLinkModal }: ImportantLinkProps) {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])


  return (
    <div className="space-y-6">
      <h2 className="text-zinc-50 text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links.length > 0 ? (
          links.map((link, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{link.title}</span>
                <a href={link.url} className="block text-xs text-zinc-400 truncate">{link.url}</a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          ))
        ) : (
          <p className="text-zinc-400">Não temos Links para esta viagem.</p>
        )}
      </div>
      <Button variant="secondary" size="full" onClick={openAddLinkModal}  >
        <Plus className="size-5" />Cadastrar novo link
      </Button>


    </div >
  )
}