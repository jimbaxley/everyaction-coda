import * as coda from "@codahq/packs-sdk";
import { ContactSchema } from "../schemas";

const BASE_URL = "https://api.securevan.com/v4";

export const ContactsTable = coda.makeSyncTable({
  name: "Contacts",
  description: "Sync all contacts from EveryAction",
  identityName: "Contact",
  schema: ContactSchema,
  formula: {
    name: "SyncContacts",
    description: "Sync contacts from EveryAction",
    parameters: [],
    execute: async function ([], context) {
      let url = `${BASE_URL}/people`;
      const queryParams: string[] = [];

      // No filters: this table syncs all contacts (full first run, then deltas)
      // Expand related data
      queryParams.push("$expand=addresses,emails,phones");

      // Pagination size
      queryParams.push("$top=50");

      // Delta sync support
      const prevLastSync = context.sync && context.sync.continuation && context.sync.continuation.lastSyncTime;
      const newSyncTime = new Date().toISOString();
      if (prevLastSync) {
        // For delta runs, request only records changed since last successful sync
        queryParams.push(`changedSince=${encodeURIComponent(prevLastSync)}`);
      }

      // Pagination (skip) - preserved across continuation
      if (context.sync && context.sync.continuation && context.sync.continuation.skip) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }

      url += `?${queryParams.join('&')}`;

      console.log(`SyncContacts: GET ${url}`);

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
      
      let continuation: any = undefined;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: parseInt(skipMatch[1]) };
          // If we're already doing a delta run, preserve the previous lastSyncTime across pages
          if (prevLastSync) {
            continuation.lastSyncTime = prevLastSync;
          }
          console.log(`SyncContacts: paging, next skip=${continuation.skip}`);
        }
      } else {
        // Final page: advance the lastSyncTime so next run will be delta from this point
        continuation = { lastSyncTime: newSyncTime };
        console.log(`SyncContacts: completed page set lastSyncTime=${newSyncTime}`);
      }

      return {
        result,
        continuation,
      };
    },
  },
});