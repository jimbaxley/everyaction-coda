import * as coda from "@codahq/packs-sdk";

export const EventSignupSchema = coda.makeObjectSchema({
  properties: {
    eventSignupId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the event signup",
    },
    personVanId: {
      type: coda.ValueType.Number,
      description: "VAN ID of the person signed up",
    },
    personName: {
      type: coda.ValueType.String,
      description: "Full name of the person signed up",
    },
    eventId: {
      type: coda.ValueType.Number,
      description: "ID of the event",
    },
    eventName: {
      type: coda.ValueType.String,
      description: "Name of the event",
    },
    eventShiftId: {
      type: coda.ValueType.Number,
      description: "Shift ID for this signup",
    },
    shift: {
      type: coda.ValueType.String,
      description: "Shift name for this signup",
    },
    roleId: {
      type: coda.ValueType.Number,
      description: "Role ID for this signup",
    },
    role: {
      type: coda.ValueType.String,
      description: "Role name for this signup",
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
    location: {
      type: coda.ValueType.String,
      description: "Location name for this signup",
    },
    startTime: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Start time for this signup",
    },
    endTime: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "End time for this signup",
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the signup was created",
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the signup was last modified",
    },
  },
  displayProperty: "personName",
  idProperty: "eventSignupId",
  featuredProperties: [
    "eventSignupId",
    "personName", 
    "eventName",
    "status",
    "role",
    "shift",
    "startTime",
    "endTime",
  ],
});
