import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, Calendar, ArrowRight, Settings2   } from "lucide-react";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

interface DestinationAndDateStepProps{
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
}

type DateRange = [Date | undefined, Date | undefined];

export function DestinationAndDateStep({isGuestsInputOpen, closeGuestsInput,openGuestsInput}: DestinationAndDateStepProps){
  registerLocale('pt-BR', ptBR)

  const [dateRange, setDateRange] = useState<DateRange>([undefined, undefined])
  const [startDate, endDate] = dateRange;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
    <div className='flex gap-2 items-center flex-1'>
      <MapPin className='size-5 text-zinc-400' />
      <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
    </div>
    <div className='flex gap-2 items-center '>
      <Calendar className='size-5 text-zinc-400' />
      <DatePicker   
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update: [Date | null, Date | null]) => {
        setDateRange(update.map(date => date || undefined) as DateRange);
      }}
      isClearable={true}
      locale="pt-BR"
      dateFormat="dd 'a' dd 'de' MMM." disabled={isGuestsInputOpen} placeholderText="Quando?" 
      className="bg-transparent text-lg placeholder-zinc-400 outline-none w-52"
      />
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
  )
}