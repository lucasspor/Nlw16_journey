import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from 'nodemailer'
import {dayjs} from "../lib/dayjs";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    schema: {
      body: z.object({
        destination: z.string().min(4),
        starts_at: z.coerce.date(),
        ends_at: z.coerce.date(),
        owner_name: z.string(),
        owner_email: z.string().email(),
        email_to_invite: z.array(z.string().email()),
      })
    }
  }, async (request) => {
    const { destination, starts_at, ends_at, owner_name, owner_email, email_to_invite } = request.body

    if (dayjs(starts_at).isBefore(new Date())) {
      throw new ClientError('Invalid trip start date')
    }

    if (dayjs(ends_at).isBefore(starts_at)) {
      throw new ClientError('Invalid trip end date')
    }

    const trip = await prisma.trip.create(
      {
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data:[
                {
                  name: owner_name,
                  email: owner_email,
                  is_confirmed: true,
                  is_owner: true
                },
                ...email_to_invite.map(email => {
                  return {email}
                })
              ]
            }
          }
        }
      }
    )

    const formateDateStart = dayjs("12-25-1995", "MM-DD-YYYY")

    const formateDateEnd = dayjs("12-25-1995", "MM-DD-YYYY")

    const confirmationLink = `${env.PORT}trips/${trip.id}/confirm`

    const mail = await getMailClient()

    return { tripId: trip.id }
  })
} 