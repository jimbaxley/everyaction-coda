import * as coda from "@codahq/packs-sdk";

export const AccountSchema = coda.makeObjectSchema({
  properties: {
    vanId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the account in EveryAction",
    },
    name: {
      type: coda.ValueType.String,
      description: "Account name",
    },
    type: {
      type: coda.ValueType.String,
      description: "Account type (Individual, Organization, etc.)",
    },
    email: {
      type: coda.ValueType.String,
      description: "Primary email address",
    },
    phone: {
      type: coda.ValueType.String,
      description: "Primary phone number",
    },
    website: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "Account website",
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the account was created",
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the account was last modified",
    },
  },
  displayProperty: "name",
  idProperty: "vanId",
  featuredProperties: ["name", "type", "email", "phone"],
});