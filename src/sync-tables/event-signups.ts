import * as coda from "@codahq/packs-sdk";
import { EventSignupSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const EventSignupsTable = coda.makeSyncTable({
  name: "EventSignups",
  description: "Sync event signups from EveryAction",
  identityName: "EventSignup",
  schema: EventSignupSchema,
  formula: {
    name: "SyncEventSignups",
    description: "Sync event signups from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "eventId",
        description: "Filter by specific event ID (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "vanId",
        description: "Filter by specific person VAN ID (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "status",
        description: "Filter by signup status (optional)",
        optional: true,
      }),
    ],
    execute: async function ([eventId, vanId, status], context) {
      // Either eventId or vanId must be specified according to the API
      if (!eventId && !vanId) {
        throw new coda.UserVisibleError("Either eventId or vanId parameter must be specified");
      }
      
      let url = `${BASE_URL}/signups`;
      const queryParams = [];
      
      if (eventId) {
        queryParams.push(`eventId=${encodeURIComponent(eventId.toString())}`);
      }
      
      if (vanId) {
        queryParams.push(`vanId=${encodeURIComponent(vanId.toString())}`);
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
      const signups = data.items || [];
      
      // Filter by status if specified
      const filteredSignups = status 
        ? signups.filter((signup: any) => signup.status?.name === status)
        : signups;
      
      const result = filteredSignups.map((signup: any) => ({
        eventSignupId: signup.eventSignupId,
        personVanId: signup.person?.vanId,
        personName: `${signup.person?.firstName} ${signup.person?.lastName}`.trim(),
        eventId: signup.event?.eventId,
        eventName: signup.event?.name,
        status: signup.status?.name,
        statusId: signup.status?.statusId,
        role: signup.role?.name,
        roleId: signup.role?.roleId,
        shift: signup.shift?.name,
        eventShiftId: signup.shift?.eventShiftId,
        startTime: signup.startTime,
        endTime: signup.endTime,
        location: signup.location?.name,
        locationId: signup.location?.locationId,
        dateCreated: signup.dateCreated,
        dateModified: signup.dateModified,
      }));
      
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      
      return {
        result,
        continuation,
      };
    },
  },
});
