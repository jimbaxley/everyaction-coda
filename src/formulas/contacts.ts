import * as coda from "@codahq/packs-sdk";
import { ContactSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const getContact = coda.makeFormula({
  name: "GetContact",
  description: "Retrieve a contact from EveryAction by VAN ID",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "The VAN ID of the contact to retrieve",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function ([vanId], context) {
    if (isNaN(vanId) || vanId <= 0) {
      throw new coda.UserVisibleError("Invalid VAN ID. Please provide a positive number.");
    }

    // Encode the entire URL to ensure query parameters are preserved
    // Use OData convention: encode the $ in the query key as %24 to bypass Coda's stripping
    const encodedUrl = `${BASE_URL}/people/${vanId}?%24expand=emails,phones,addresses`;
    console.log("GetContact: URL:", encodedUrl);

    try {
      const response = await context.fetcher.fetch({
        method: "GET",
        url: encodedUrl,
      });
      const contact = response.body;
      // Log the raw response for debugging
      console.log(`GetContact: Raw Response:`, contact);
      // Return the contact as-is for now
      return contact;
    } catch (error: any) {
      throw new coda.UserVisibleError(`Failed to retrieve contact ${vanId}: ${error.message}`);
    }
  },
});

export const createContact = coda.makeFormula({
  name: "CreateContact",
  description: "Create a new contact in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "firstName",
      description: "Contact's first name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "lastName",
      description: "Contact's last name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "Contact's email address",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function ([firstName, lastName, email], context) {
    const contactData = {
      firstName,
      lastName,
      emails: email ? [{ email, type: "P" }] : [],
    };
    
    const response = await context.fetcher.fetch({
      method: "POST",
      url: `${BASE_URL}/people`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    
    const vanId = response.body;
    
    // Fetch the created contact to return full details
    return await getContact.execute([vanId], context);
  },
});

export const updateContact = coda.makeFormula({
  name: "UpdateContact",
  description: "Update an existing contact in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "The VAN ID of the contact to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "firstName",
      description: "Contact's first name",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "lastName",
      description: "Contact's last name",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "Contact's email address",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function ([vanId, firstName, lastName, email], context) {
    const updateData: any = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.emails = [{ email, type: "P" }];
    
    await context.fetcher.fetch({
      method: "POST",
      url: `${BASE_URL}/people/${vanId}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    
    // Return the updated contact
    return await getContact.execute([vanId], context);
  },
});