import * as coda from "@codahq/packs-sdk";

export const LocationSchema = coda.makeObjectSchema({
  properties: {
    locationId: { type: coda.ValueType.Number, description: "Unique identifier for the location" },
    name: { type: coda.ValueType.String, description: "Location name" },
    addressLine1: { type: coda.ValueType.String, description: "Address line 1" },
    addressLine2: { type: coda.ValueType.String, description: "Address line 2" },
    city: { type: coda.ValueType.String, description: "City" },
    stateOrProvince: { type: coda.ValueType.String, description: "State or province" },
    zipOrPostalCode: { type: coda.ValueType.String, description: "ZIP or postal code" },
    countryCode: { type: coda.ValueType.String, description: "Country code" },
    isAccessible: { type: coda.ValueType.Boolean, description: "Whether the location is accessible" },
    dateCreated: { type: coda.ValueType.String, description: "Date the location was created" },
    dateModified: { type: coda.ValueType.String, description: "Date the location was last modified" },
  },
  displayProperty: "name",
  idProperty: "locationId",
  featuredProperties: ["locationId", "name", "city", "stateOrProvince", "zipOrPostalCode"],
});
