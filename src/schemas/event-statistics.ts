import * as coda from "@codahq/packs-sdk";

export const EventStatsSchema = coda.makeObjectSchema({
  properties: {
    eventId: { type: coda.ValueType.Number, description: "ID of the event" },
    eventName: { type: coda.ValueType.String, description: "Name of the event" },
    eventType: { type: coda.ValueType.String, description: "Type of event" },
    startDate: { 
      type: coda.ValueType.String, 
      codaType: coda.ValueHintType.DateTime,
      description: "Event start date" 
    },
    endDate: { 
      type: coda.ValueType.String, 
      codaType: coda.ValueHintType.DateTime,
      description: "Event end date" 
    },
    totalSignups: { type: coda.ValueType.Number, description: "Total number of signups for the event" },
    completed: { type: coda.ValueType.Number, description: "Number of Completed signups" },
    schedweb: { type: coda.ValueType.Number, description: "Number of Sched-Web signups" },
    declined: { type: coda.ValueType.Number, description: "Number of Declined signups" },
    noshow: { type: coda.ValueType.Number, description: "Number of No Show signups" },
  },
  displayProperty: "eventName",
  idProperty: "eventId",
  featuredProperties: ["eventName", "eventType", "startDate", "totalSignups", "completed", "schedweb"],
});
