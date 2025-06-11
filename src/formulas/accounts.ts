// This file has been deprecated. Use contacts formulas instead.

import * as coda from "@codahq/packs-sdk";
import { AccountSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const getAccount = coda.makeFormula({
  name: "GetAccount",
  description: "Retrieve an account from EveryAction by VAN ID",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "The VAN ID of the account to retrieve",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: AccountSchema,
  execute: async function ([vanId], context) {
    const response = await context.fetcher.fetch({
      method: "GET",
      url: `${BASE_URL}/accounts/${vanId}`,
    });
    
    const account = response.body;
    return {
      vanId: account.vanId,
      name: account.name,
      type: account.type,
      email: account.emails?.[0]?.email,
      phone: account.phones?.[0]?.phoneNumber,
      website: account.website,
      dateCreated: account.dateCreated,
      dateModified: account.dateModified,
    };
  },
});

export const createAccount = coda.makeFormula({
  name: "CreateAccount",
  description: "Create a new account in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Account name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "type",
      description: "Account type (Individual, Organization, etc.)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "Account email address",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: AccountSchema,
  execute: async function ([name, type, email], context) {
    const accountData = {
      name,
      type: type || "Organization",
      emails: email ? [{ email, type: "P" }] : [],
    };
    
    const response = await context.fetcher.fetch({
      method: "POST",
      url: `${BASE_URL}/accounts`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    });
    
    const vanId = response.body;
    
    // Fetch the created account to return full details
    return await getAccount.execute([vanId], context);
  },
});

export const updateAccount = coda.makeFormula({
  name: "UpdateAccount",
  description: "Update an existing account in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "The VAN ID of the account to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Account name",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "Account email address",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: AccountSchema,
  execute: async function ([vanId, name, email], context) {
    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (email) updateData.emails = [{ email, type: "P" }];
    
    await context.fetcher.fetch({
      method: "POST",
      url: `${BASE_URL}/accounts/${vanId}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    
    // Return the updated account
    return await getAccount.execute([vanId], context);
  },
});