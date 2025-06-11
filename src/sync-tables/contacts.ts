import * as coda from "@codahq/packs-sdk";
import { ContactSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const ContactsTable = coda.makeSyncTable({
  name: "Contacts",
  description: "Sync contacts from EveryAction",
  identityName: "Contact",
  schema: ContactSchema,
  formula: {
    name: "SyncContacts",
    description: "Sync contacts from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "firstName",
        description: "First name to search for (required)",
        optional: false,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "lastName",
        description: "Last name to filter by",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "email",
        description: "Email address to filter by",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "phone",
        description: "Phone number to filter by",
        optional: true,
      }),
    ],
    execute: async function ([firstName, lastName, email, phone], context) {
      let url = `${BASE_URL}/people`;
      const queryParams = [];
      
      // Required firstName parameter
      queryParams.push(`firstName=${encodeURIComponent(firstName)}`);
      
      // Optional filters
      if (lastName) {
        queryParams.push(`lastName=${encodeURIComponent(lastName)}`);
      }
      if (email) {
        queryParams.push(`email=${encodeURIComponent(email)}`);
      }
      if (phone) {
        queryParams.push(`phoneNumber=${encodeURIComponent(phone)}`);
      }
      
      // Expand related data
      queryParams.push("$expand=addresses,emails,phones");
      
      // Add pagination
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      
      url += `?${queryParams.join('&')}`;
      
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      
      const data = response.body;
      const contacts = data.items || [];
      
      const result = contacts.map((contact: any) => {
        // Helper function to get primary item from array
        const getPrimary = (items: any[], fallbackIndex = 0) => {
          if (!items || items.length === 0) return null;
          const primary = items.find(item => item.isPreferred);
          return primary || items[fallbackIndex];
        };
        
        // Get primary contact methods
        const primaryAddress = getPrimary(contact.addresses);
        const primaryEmail = getPrimary(contact.emails);
        const primaryPhone = getPrimary(contact.phones);
        
        // Format primary address as string
        const formatAddress = (addr: any) => {
          if (!addr) return null;
          const parts = [
            addr.addressLine1,
            addr.addressLine2,
            addr.addressLine3,
            addr.city && addr.stateOrProvince ? `${addr.city}, ${addr.stateOrProvince}` : (addr.city || addr.stateOrProvince),
            addr.zipOrPostalCode
          ].filter(Boolean);
          return parts.join(', ');
        };
        
        return {
          vanId: contact.vanId,
          firstName: contact.firstName || "",
          middleName: contact.middleName || "",
          lastName: contact.lastName || "",
          email: contact.emails?.[0]?.email || "",
          phone: contact.phones?.[0]?.phoneNumber || "",
          dateCreated: contact.dateCreated || "",
          dateModified: contact.dateModified || "",
          dateOfBirth: contact.dateOfBirth || "",
          sex: contact.sex || "",
          employer: contact.employer || "",
          occupation: contact.occupation || "",
          title: contact.title || "",
          suffix: contact.suffix || "",
          addresses: Array.isArray(contact.addresses) ? contact.addresses : [],
          emails: Array.isArray(contact.emails) ? contact.emails : [],
          phones: Array.isArray(contact.phones) ? contact.phones : [],
          primaryAddress: formatAddress(primaryAddress) || "",
          primaryEmail: primaryEmail?.email || "",
          primaryPhone: primaryPhone?.phoneNumber || "",
          organizationName: contact.organizationName || "",
          organizationType: contact.organizationType || "",
          isOrganization: !!contact.isOrganization,
          // Add static test column for schema propagation testing
          testColumn: "test-value"
        };
      });
      
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: parseInt(skipMatch[1]) };
        }
      }
      
      return {
        result,
        continuation,
      };
    },
  },
});