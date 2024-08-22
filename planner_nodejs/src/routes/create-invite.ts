import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import nodemailer from 'nodemailer';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";

export async function createInvites(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/invite', {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object(
        {
          email: z.string().email()
        }
      )

    }
  }, async (request) => {
    const { tripId } = request.params
    const { email } = request.body

    const trip = await prisma.trip.findUnique(
      {
        where: { id: tripId, },
      })

    if (!trip) {
      throw new Error('Trip not found')
    }

    const participant = await prisma.participant.create({
      data: {
        email,
        trip_id: tripId
      }
    })

    const formateDateStart = dayjs("12-25-1995", "MM-DD-YYYY")

    const formateDateEnd = dayjs("12-25-1995", "MM-DD-YYYY")

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@plann.er',
      },
      to: participant.email,
      subject: '<h1>Testando Email</h1>',
      html: '<p>teste do envio</p>',
    })

    const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`



    console.log(nodemailer.getTestMessageUrl(message))


    return { participantId: participant.id }
  })
} 