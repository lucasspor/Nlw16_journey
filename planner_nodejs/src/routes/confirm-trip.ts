import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from 'nodemailer';
import { z } from "zod";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (request, reply) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include:{
        participants: {
          where: {
            is_owner: true,
          }
        }
      }
    })

    if (!trip) {
      throw new ClientError('Trip not found')
    }

    if (trip.is_confirmed) {
      return reply.redirect(`${env.WEB_BASE_URL}trips${tripId}`)
    }

    await prisma.trip.update({
      where: { id: tripId, },
      data: { is_confirmed: true }
    }) 

    const formateDateStart = dayjs("12-25-1995", "MM-DD-YYYY")

    const formateDateEnd = dayjs("12-25-1995", "MM-DD-YYYY")

    const mail = await getMailClient()

    await Promise.all([
      trip.participants.map(async (participant) => {
        const message = await mail.sendMail({
          from: {
            name: 'Equipe plann.er',
            address: 'oi@plann.er',
          },
          to: participant.email,
          subject: '<h1>Testando Email</h1>',
          html: '<p>teste do envio</p>',
        })
        
         const confirmationLink = `${env.PORT}participants/${participant.id}/confirm`

        console.log(nodemailer.getTestMessageUrl(message))
      })
    ])

    return reply.redirect(`${env.WEB_BASE_URL}trips${tripId}`)
  })
} 