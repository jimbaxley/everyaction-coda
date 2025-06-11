import * as coda from "@codahq/packs-sdk";

export const EventStatsSchema = coda.makeObjectSchema({
  properties: {
    eventId: { type: coda.ValueType.Number, description: "ID of the event" },
    totalSignups: { type: coda.ValueType.Number, description: "Total number of signups for the event" },
    completed: { type: coda.ValueType.Number, description: "Number of Completed signups" },
    scheduled: { type: coda.ValueType.Number, description: "Number of Scheduled signups" },
    cancelled: { type: coda.ValueType.Number, description: "Number of Cancelled signups" },
    declined: { type: coda.ValueType.Number, description: "Number of Declined signups" },
    noShow: { type: coda.ValueType.Number, description: "Number of No-Show signups" },
    // Add more status columns as needed
  },
  displayProperty: "eventId",
  idProperty: "eventId",
  featuredProperties: ["eventId", "totalSignups", "completed", "scheduled", "cancelled", "declined", "noShow"],
});
