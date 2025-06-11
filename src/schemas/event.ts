import * as coda from "@codahq/packs-sdk";

export const EventSchema = coda.makeObjectSchema({
  properties: {
    eventId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the event in EveryAction",
    },
    name: {
      type: coda.ValueType.String,
      description: "Event name",
    },
    shortName: {
      type: coda.ValueType.String,
      description: "Event short name",
    },
    description: {
      type: coda.ValueType.String,
      description: "Event description",
    },
    eventType: {
      type: coda.ValueType.String,
      description: "Type of event (e.g., Fundraiser, Training, etc.)",
    },
    startDate: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Event start date and time",
    },
    endDate: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Event end date and time",
    },
    publicWebsiteUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "Public website URL for the event",
    },
    voterRegistrationBatches: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Voter registration batch IDs",
    },
    notes: {
      type: coda.ValueType.String,
      description: "Event notes",
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the event was created",
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the event was last modified",
    },
    // totalSignups: {
    //   type: coda.ValueType.Number,
    //   description: "Total number of signups for this event",
    // },
    // completedSignups: {
    //   type: coda.ValueType.Number,
    //   description: "Number of Completed signups for this event",
    // },
    // schedWebSignups: {
    //   type: coda.ValueType.Number,
    //   description: "Number of Sched-Web signups for this event",
    // },
    // declinedSignups: {
    //   type: coda.ValueType.Number,
    //   description: "Number of Declined signups for this event",
    // },
    // noShowSignups: {
    //   type: coda.ValueType.Number,
    //   description: "Number of No-Show signups for this event",
    // },
    // testColumn: {
    //   type: coda.ValueType.Number,
    //   description: "Static test column for schema propagation troubleshooting",
    // },
  },
  displayProperty: "name",
  idProperty: "eventId",
  featuredProperties: ["name", "eventType", "startDate", "endDate"],
});
