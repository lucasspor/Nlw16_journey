import { MapPin, Calendar, ArrowRight, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import { format } from 'date-fns';
import { Autocomplete, LoadScript } from '@react-google-maps/api';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (date: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [place, setPlace] = useState<string>('');

  function formatAddress(addressComponents: google.maps.GeocoderAddressComponent[]): string | null {
    let city = '';
    let state = '';
    let country = '';

    addressComponents.forEach(component => {
      const types = component.types;

      if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        city = component.long_name;
      }

      if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }

      if (types.includes('country')) {
        country = component.long_name;
      }
    });

    if (city && state && country) {
      return `${city} - ${state}, ${country}`;
    }

    return null;
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const selectedPlace = autocomplete.getPlace();
      if (selectedPlace.address_components) {
        const formattedAddress = formatAddress(selectedPlace.address_components);
        if (formattedAddress) {
          setPlace(formattedAddress);
          setDestination(formattedAddress);
        }
      }
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
    setDestination(event.target.value);
  };

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
    : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className='flex gap-1 items-center flex-1 truncate'>
        <MapPin className='size-5 text-zinc-400 shrink-0' />
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              disabled={isGuestsInputOpen}
              value={place}
              type="text"
              placeholder="Para onde você vai"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 truncate"
              onChange={handleInputChange}
            />
          </Autocomplete>
        </LoadScript>
      </div>
      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className='w-56 bg-transparent flex gap-2 items-center text-left'>
        <Calendar className='size-5 text-zinc-400' />
        <span className="flex-1 text-lg text-zinc-400 w-34">
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
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                day: 'text-zinc-100 hover:bg-zinc-600 hover:rounded-full',
                selected: 'bg-lime-300 text-zinc-500 font-bold rounded-full',
                range_start: 'bg-yellow-300 text-white rounded-full',
                range_end: 'bg-red-500 text-white rounded-full',
              }}
            />
          </div>
        </div>
      )}

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
  );
}
