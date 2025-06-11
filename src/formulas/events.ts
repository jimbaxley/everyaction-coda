import * as coda from "@codahq/packs-sdk";
import { EventSchema } from "../schemas/event";

export const getEvent = coda.makeFormula({
  name: "GetEvent",
  description: "Retrieve a single event from EveryAction by eventId.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "The eventId of the event to retrieve.",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: EventSchema,
  execute: async function ([eventId], context) {
    const BASE_URL = "https://api.securevan.com/v4";
    const url = `${BASE_URL}/events/${eventId}`;
    const response = await context.fetcher.fetch({
      method: "GET",
      url,
    });
    const event = response.body;
    return {
      eventId: event.eventId,
      name: event.name || "",
      shortName: event.shortName || "",
      description: event.description || "",
      eventType: event.eventType?.name || "",
      startDate: event.startDate || "",
      endDate: event.endDate || "",
      publicWebsiteUrl: event.publicWebsiteUrl || "",
      voterRegistrationBatches: Array.isArray(event.voterRegistrationBatches) ? event.voterRegistrationBatches : [],
      notes: event.notes || "",
      dateCreated: event.createdDate || event.dateCreated || "",
      dateModified: event.dateModified || "",
    };
  },
});
