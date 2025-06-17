import * as coda from "@codahq/packs-sdk";

export const LocationSchema = coda.makeObjectSchema({
  properties: {
    locationId: { 
      type: coda.ValueType.Number, 
      description: "Unique identifier for the location",
      fromKey: "locationId",
    },
    name: { 
      type: coda.ValueType.String, 
      description: "Location name",
      fromKey: "name",
    },
    displayName: { 
      type: coda.ValueType.String, 
      description: "Display name with address preview",
      fromKey: "displayName",
    },
    addressLine1: { 
      type: coda.ValueType.String, 
      description: "Address line 1",
      fromKey: "addressLine1",
    },
    addressLine2: { 
      type: coda.ValueType.String, 
      description: "Address line 2",
      fromKey: "addressLine2",
    },
    addressLine3: { 
      type: coda.ValueType.String, 
      description: "Address line 3",
      fromKey: "addressLine3",
    },
    unitNo: { 
      type: coda.ValueType.String, 
      description: "Unit number",
      fromKey: "unitNo",
    },
    city: { 
      type: coda.ValueType.String, 
      description: "City",
      fromKey: "city",
    },
    stateOrProvince: { 
      type: coda.ValueType.String, 
      description: "State or province",
      fromKey: "stateOrProvince",
    },
    zipOrPostalCode: { 
      type: coda.ValueType.String, 
      description: "ZIP or postal code",
      fromKey: "zipOrPostalCode",
    },
    countryCode: { 
      type: coda.ValueType.String, 
      description: "Country code",
      fromKey: "countryCode",
    },
    latitude: { 
      type: coda.ValueType.Number, 
      description: "Latitude coordinate",
      fromKey: "latitude",
    },
    longitude: { 
      type: coda.ValueType.Number, 
      description: "Longitude coordinate",
      fromKey: "longitude",
    },
    addressPreview: { 
      type: coda.ValueType.String, 
      description: "Formatted address preview",
      fromKey: "addressPreview",
    },
    addressDisplayMode: { 
      type: coda.ValueType.String, 
      description: "Address display mode (e.g., Standardized)",
      fromKey: "addressDisplayMode",
    },
    isPreferred: { 
      type: coda.ValueType.Boolean, 
      description: "Whether this is a preferred address",
      fromKey: "isPreferred",
    },
    isBest: { 
      type: coda.ValueType.Boolean, 
      description: "Whether this is the best address",
      fromKey: "isBest",
    },
    notes: { 
      type: coda.ValueType.String, 
      description: "Location notes",
      fromKey: "notes",
    },
    codes: { 
      type: coda.ValueType.String, 
      description: "Location codes",
      fromKey: "codes",
    },
    hasAddress: { 
      type: coda.ValueType.Boolean, 
      description: "Whether the location has address information",
      fromKey: "hasAddress",
    },
    fullAddress: { 
      type: coda.ValueType.String, 
      description: "Complete formatted address",
      fromKey: "fullAddress",
    },
  },
  displayProperty: "displayName",
  idProperty: "locationId",
  featuredProperties: ["locationId", "name", "displayName", "city", "stateOrProvince", "zipOrPostalCode"],
});
