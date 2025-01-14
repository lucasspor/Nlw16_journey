import cors from '@fastify/cors';
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipantTrip } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createTrip } from "./routes/create-trip";
import { createActivity } from './routes/create-activity';
import { getActivities } from './routes/get-activity';
import { createLinks } from './routes/create-link';
import { getLinks } from './routes/get-link';
import { getParticipants } from './routes/get.participants';
import { createInvites } from './routes/create-invite';
import { updateTrip } from './routes/update-trip';
import { getTripDetails } from './routes/get-trip-details';
import { getParticipant } from './routes/get-participant';
import { env } from './env';

const app = fastify()

app.register(cors,  {
  origin: true
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipantTrip)
app.register(createActivity)
app.register(getActivities)
app.register(createLinks)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvites)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.listen({port: env.PORT}).then(()=>{
  console.log("Server running")
})