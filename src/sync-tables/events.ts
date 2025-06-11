import * as coda from "@codahq/packs-sdk";
import { EventSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const EventsTable = coda.makeSyncTable({
  name: "Events",
  description: "Sync events from EveryAction",
  identityName: "Event",
  schema: EventSchema,
  formula: {
    name: "SyncEvents",
    description: "Sync events from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "eventType",
        description: "Filter by event type (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "startDate",
        description: "Filter events starting from this date (YYYY-MM-DD format, optional)",
        optional: true,
      }),
    ],
    execute: async function ([eventType, startDate], context) {
      let url = `${BASE_URL}/events`;
      const queryParams = [];
      
      if (eventType) {
        queryParams.push(`eventType=${encodeURIComponent(eventType)}`);
      }
      
      if (startDate) {
        queryParams.push(`startingAfter=${encodeURIComponent(startDate)}`);
      }
      
      // Add pagination
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      
      const data = response.body;
      const events = data.items || [];
      
      const result = await Promise.all(events.map(async (event: any) => {
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
          totalSignups: undefined, // removed for now
          completedSignups: undefined, // removed for now
          schedWebSignups: undefined, // removed for now
          declinedSignups: undefined, // removed for now
          noShowSignups: undefined, // removed for now
          testColumn: undefined, // removed for now
        };
      }));
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: parseInt(skipMatch[1], 10) };
        }
      }
      return {
        result,
        continuation,
      };
    },
  },
});
