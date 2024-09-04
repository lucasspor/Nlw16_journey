import { api } from "./api";


export type TripDetails = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: string
}

type TripCreate = Omit<TripDetails, "id" | "is_confirmed"> & {
  email_to_invite: string[]
  owner_name: string
  owner_email: string
}

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`)
    return data.trip
  } catch (error) {
    throw error
  }
}

async function create({
  destination,
  starts_at,
  ends_at,
  email_to_invite,
  owner_email,
  owner_name }: TripCreate) {
  try {
    const { data } = await api.post<{tripId: string}>("/trips", {
      destination,
      starts_at,
      ends_at,
      email_to_invite,
      owner_email: "lucassp1112@outlook.com",
      owner_name: "Lucas Silva Porto"
    })

    return data

  } catch (error) {
    throw error
  }
}

export const tripServer = { getById, create }