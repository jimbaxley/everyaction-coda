import * as coda from "@codahq/packs-sdk";

export const EventSignupSchema = coda.makeObjectSchema({
  properties: {
    personVanId: {
      type: coda.ValueType.Number,
      description: "VAN ID of the person signed up",
    },
    eventId: {
      type: coda.ValueType.Number,
      description: "ID of the event",
    },
    eventShiftId: {
      type: coda.ValueType.Number,
      description: "Shift ID for this signup",
    },
    roleId: {
      type: coda.ValueType.Number,
      description: "Role ID for this signup",
    },
    statusId: {
      type: coda.ValueType.Number,
      description: "Signup status code ID (e.g., 2, 30)",
    },
    status: {
  type: coda.ValueType.String,
  description: "Signup status display value (e.g., Completed, Scheduled, etc.)",
},
    locationId: {
      type: coda.ValueType.Number,
      description: "Location ID for this signup",
    },
    eventSignupId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the event signup",
    },
  },
  displayProperty: "personVanId",
  idProperty: "eventSignupId",
  featuredProperties: [
    "eventSignupId",
    "personVanId",
    "eventId",
    "eventShiftId",
    "roleId",
    "statusId",
    "status",
    "locationId",
  ],
});
