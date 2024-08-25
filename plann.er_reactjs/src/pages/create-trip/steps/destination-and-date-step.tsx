import { MapPin, Calendar, ArrowRight, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import { format } from 'date-fns'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
}


export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput }: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEnd, setEventStartAndEnd] = useState<DateRange | undefined>()

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }


  const displayedDate = eventStartAndEnd && eventStartAndEnd.from  &&  eventStartAndEnd.to? format(eventStartAndEnd.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEnd.to, "d 'de' LLL")) : null



  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex gap-2 items-center flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
      </div>
      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='w-60 bg-transparent flex gap-2 items-center text-left'>
        <Calendar className='size-5 text-zinc-400' />
        <span className="flex-1 text-lg text-zinc-400 w-40">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className='fixed bg-black/60 inset-0 flex items-center justify-center'>
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecione a data</h2>
                <button onClick={closeDatePicker} aria-label='Abrir e Fechar Modal'><X className='size-5 text-zinc-400' /></button>
              </div>
            </div>
            <div className="w-full h-px bg-zinc-800"></div>
            <DayPicker 
              mode="range"
              selected={eventStartAndEnd}
              onSelect={setEventStartAndEnd}
              classNames={{
                day: 'text-zinc-100 hover:bg-zinc-600 hover:rounded-full', 
                selected: 'bg-lime-300 text-zinc-500 font-bold rounded-full', 
                range_start: 'bg-yellow-300 text-white roundedfull', 
                range_end: 'bg-red-500 text-white roundedful',
              }}
            />
          </div>
        </div>
      )

      }

      <div className='w-px h-6 bg-zinc-800'></div>

      {isGuestsInputOpen ?
        (
          <Button variant="secondary" onClick={closeGuestsInput}>
            Alterar local/data <Settings2 className='size-5' />
          </Button>
        ) :
        (
          <Button onClick={openGuestsInput}>
            Confirmar viagem <ArrowRight className='size-5' />
          </Button>
        )}
    </div>
  )
}