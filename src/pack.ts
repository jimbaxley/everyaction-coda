import * as coda from "@codahq/packs-sdk";
import { ContactSchema } from "./schemas/contact";
import { EventSchema } from "./schemas/event";
import { EventSignupSchema } from "./schemas/event-signup";
import { SignupDetailsSchema } from "./schemas/signup-details";
import { LocationSchema } from "./schemas/location";
import { EventStatsSchema } from "./schemas/event-statistics";
import { EventTypeSchema } from "./schemas/event-type";

export const pack = coda.newPack();

// Pack metadata
pack.setUserAuthentication({
  type: coda.AuthenticationType.WebBasic,
  instructionsUrl: "https://docs.ngpvan.com/docs/authentication",
  defaultConnectionRequirement: coda.ConnectionRequirement.Required, // Set default connection requirement for all formulas
   networkDomain: "api.securevan.com", // <--- Add this line

  uxConfig: {
    placeholderUsername: "Application Name",
    placeholderPassword: "API Key",
  },
  getConnectionName: async function(context) {
    // Get user info to set a meaningful connection name
    try {
      const response = await context.fetcher.fetch({
        method: "GET",
        url: "https://api.securevan.com/v4/people/self",
      });
      const user = response.body;
      return user.displayName || user.firstName + " " + user.lastName || "EveryAction User";
    } catch (error) {
      // Fallback if the user endpoint fails
      return "EveryAction Connection";
    }
  },
});

pack.addNetworkDomain("api.securevan.com");

// Schemas are imported from separate files at the top of this file
// No inline schema definitions needed - using imported ContactSchema, EventSchema, EventSignupSchema

// Get Contact formula
pack.addFormula({
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
    const BASE_URL = "https://api.securevan.com/v4";
    const encodedUrl = `${BASE_URL}/people/${vanId}?%24expand=emails,phones,addresses`;

    const response = await context.fetcher.fetch({
      method: "GET",
      url: encodedUrl,
    });
    const contact = response.body;

    // Get primary address, email, and phone
    const primaryAddress = contact.addresses?.find((addr: any) => addr.isPreferred) || contact.addresses?.[0];
    const primaryEmail = contact.emails?.find((email: any) => email.isPreferred) || contact.emails?.[0];
    const primaryPhone = contact.phones?.find((phone: any) => phone.isPreferred) || contact.phones?.[0];

    return {
      vanId: contact.vanId,
      firstName: contact.firstName,
      middleName: contact.middleName,
      lastName: contact.lastName,
      commonName: contact.commonName,
      officialName: contact.officialName,
      email: primaryEmail?.email,
      phoneNumber: primaryPhone?.phoneNumber,
      streetAddress: primaryAddress?.addressLine1,
      city: primaryAddress?.city,
      stateOrProvince: primaryAddress?.stateOrProvince,
      zipOrPostalCode: primaryAddress?.zipOrPostalCode,
      contactMode: contact.contactMode,
      dateCreated: contact.dateCreated,
      dateModified: contact.dateModified,
      emails: Array.isArray(contact.emails) ? contact.emails : [],
      phones: Array.isArray(contact.phones) ? contact.phones : [],
    };
  },
});

// Create Contact formula
pack.addFormula({
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
  resultType: coda.ValueType.Number,
  execute: async function ([firstName, lastName, email], context) {
    const contactData = {
      firstName,
      lastName,
      emails: email ? [{ email, type: "P" }] : [],
    };
    
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/people",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    
    return response.body; // Returns the new VAN ID
  },
});

// Create Event formula
pack.addFormula({
  name: "CreateEvent",
  description: "Create a new event in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Event name",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "startDate",
      description: "Event start date and time (ISO 8601 format, e.g., 2015-06-02T15:00:00-04:00)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "endDate",
      description: "Event end date and time (ISO 8601 format, e.g., 2015-06-02T20:00:00-04:00)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventTypeId",
      description: "Event type ID (required)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shortName",
      description: "Event short name",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "description",
      description: "Event description",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "locationId",
      description: "Location ID for the event",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "isOnlyEditableByCreatingUser",
      description: "Whether only the creating user can edit this event (default: false)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "roleId",
      description: "Role ID for event volunteers (required - get from EveryAction admin)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "roleName",
      description: "Role name (e.g., 'Host', 'Volunteer')",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "isEventLead",
      description: "Whether this role is an event lead (default: false)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftName",
      description: "Shift name (e.g., 'Setup', 'Main Event', 'Cleanup')",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftStartTime",
      description: "Shift start date and time (ISO 8601 format, e.g., '2015-06-01T15:00:00-04:00')",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftEndTime",
      description: "Shift end date and time (ISO 8601 format, e.g., '2015-06-01T20:00:00-04:00')",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: async function ([name, startDate, endDate, eventTypeId, shortName, description, locationId, isOnlyEditableByCreatingUser, roleId, roleName, isEventLead, shiftName, shiftStartTime, shiftEndTime], context) {
    const eventData: any = {
      name,
      startDate,
      endDate,
      eventType: {
        eventTypeId,
      },
      isOnlyEditableByCreatingUser: isOnlyEditableByCreatingUser || false,
      roles: [
        {
          roleId: roleId || 1, // Default role ID if not provided
          name: roleName || "Volunteer", // Default role name
          isEventLead: isEventLead || false,
        },
      ],
      shifts: [
        {
          name: shiftName || "Main Event",
          startTime: shiftStartTime || startDate,
          endTime: shiftEndTime || endDate,
        },
      ],
    };

    if (shortName) {
      eventData.shortName = shortName;
    }

    if (description) {
      eventData.description = description;
    }

    // Robustly handle locationId as a number, object, or array (from Coda Relation column)
    let resolvedLocationId = locationId;
    if (Array.isArray(locationId)) {
      if (locationId.length > 0) {
        resolvedLocationId = locationId[0] && typeof locationId[0] === 'object' && 'locationId' in locationId[0]
          ? (locationId[0] as any).locationId
          : locationId[0];
      } else {
        resolvedLocationId = undefined;
      }
    } else if (locationId && typeof locationId === 'object' && 'locationId' in locationId) {
      resolvedLocationId = (locationId as any).locationId;
    }

    if (resolvedLocationId) {
      eventData.locations = [
        {
          locationId: resolvedLocationId,
        },
      ];
    }

    // Create the event (with shift included)
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/events",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    // Extract event ID from the Location header (e.g., "https://api.securevan.com/v4/events/450823")
    const locationHeader = response.headers?.location;
    if (!locationHeader) {
      throw new coda.UserVisibleError("No Location header found in response");
    }
    const location = Array.isArray(locationHeader) ? locationHeader[0] : locationHeader;
    const eventIdMatch = location.match(/\/events\/(\d+)$/);
    if (!eventIdMatch) {
      throw new coda.UserVisibleError("Could not extract event ID from Location header: " + location);
    }
    const eventId = parseInt(eventIdMatch[1], 10);

    // Optionally, fetch the event to get the eventShiftId (first shift)
    // (Uncomment if you want to return eventShiftId as well)
    // const eventResp = await context.fetcher.fetch({
    //   method: "GET",
    //   url: `https://api.securevan.com/v4/events/${eventId}`,
    // });
    // const event = eventResp.body;
    // const eventShiftId = event.shifts?.[0]?.eventShiftId;
    // return { eventId, eventShiftId };

    // Return just the event ID
    return eventId;
  },
});

// Update Event formula
pack.addFormula({
  name: "UpdateEvent",
  description: "Update an existing event in EveryAction (start date, end date, and description). Preserves all other existing properties.",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "The Event ID to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "startDate",
      description: "Start date and time in ISO format (e.g., 2025-06-15T15:00:00-04:00)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "endDate",
      description: "End date and time in ISO format (e.g., 2025-06-15T20:00:00-04:00)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Event name",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "description",
      description: "Event description",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Number,
  execute: async function ([eventId, startDate, endDate, name, description], context) {
    
    // Step 1: GET the existing event to preserve all properties
    const getResponse = await context.fetcher.fetch({
      method: "GET",
      url: `https://api.securevan.com/v4/events/${eventId}?$expand=locations,codes,shifts,roles,notes,voterRegistrationBatches`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const existingEvent = getResponse.body;

    // Step 2: Modify only the fields we want to update
    const updatedEvent = {
      ...existingEvent, // Preserve all existing properties
      eventId: eventId, // Required identifier
      startDate: startDate, // Update start date
      endDate: endDate, // Update end date
    };

    // Update name if provided, otherwise keep existing
    if (name !== undefined && name !== null) {
      updatedEvent.name = name;
    }

    // Update description if provided, otherwise keep existing
    if (description !== undefined && description !== null) {
      updatedEvent.description = description;
    }

    // Handle required fields that can't be null
    if (!updatedEvent.roles || updatedEvent.roles === null || updatedEvent.roles.length === 0) {
      // Default role if none exists
      updatedEvent.roles = [{
        roleId: 1,
        name: "Volunteer",
        isEventLead: false
      }];
    }

    if (!updatedEvent.shifts || updatedEvent.shifts === null || updatedEvent.shifts.length === 0) {
      // Default shift if none exists
      updatedEvent.shifts = [{
        name: "Main Event",
        startTime: startDate,
        endTime: endDate
      }];
    }

    // Ensure voterRegistrationBatches is an array
    if (!updatedEvent.voterRegistrationBatches) {
      updatedEvent.voterRegistrationBatches = [];
    }

    // Step 3: PUT the complete updated event
    await context.fetcher.fetch({
      method: "PUT",
      url: `https://api.securevan.com/v4/events/${eventId}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    });

    return eventId;
  },
});

// Shared mapping for event signup objects
function mapEventSignup(signup: any) {
  return {
    eventSignupId: signup.eventSignupId,
    personVanId: signup.person?.vanId,
    personName: signup.person ? `${signup.person.firstName || ''} ${signup.person.lastName || ''}`.trim() : '',
    eventId: signup.event?.eventId,
    eventName: signup.event?.name,
    eventShiftId: signup.shift?.eventShiftId,
    shift: signup.shift?.name,
    roleId: signup.role?.roleId,
    role: signup.role?.name,
    statusId: signup.status?.statusId,
    status: signup.status?.name,
    locationId: signup.location?.locationId,
    location: signup.location?.name,
    startTime: signup.startTime || signup.startTimeOverride || '',
    endTime: signup.endTime || signup.endTimeOverride || '',
    dateCreated: signup.dateCreated || '',
    dateModified: signup.dateModified || '',
  };
}

// Create EventSignup formula
pack.addFormula({
  name: "CreateEventSignup",
  description: "Create a new event signup in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "VAN ID of the person to sign up",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event to sign up for",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "roleId",
      description: "Role ID for the signup",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventShiftId",
      description: "Shift ID for the signup",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "statusId",
      description: "Signup status code ID (e.g., 2, 30). Required.",
      optional: false,
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "locationId",
      description: "Location ID (for multi-location events)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "startTime",
      description: "Start time (ISO format or HH:MM)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "endTime",
      description: "End time (ISO format or HH:MM)",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: EventSignupSchema,
  execute: async function ([vanId, eventId, roleId, eventShiftId, statusId, locationId, startTime, endTime], context) {
    const signupData: any = {
      person: { vanId: vanId.toString() },
      event: { eventId },
      role: { roleId },
      shift: { eventShiftId },
      status: { statusId },
    };
    if (locationId) {
      signupData.location = { locationId };
    }
    if (startTime) {
      signupData.startTime = startTime;
    }
    if (endTime) {
      signupData.endTime = endTime;
    }
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/signups",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
    const eventSignupId = response.body;
    // Fetch the created signup to return full details
    const signupResponse = await context.fetcher.fetch({
      method: "GET",
      url: `https://api.securevan.com/v4/signups?eventId=${eventId}&vanId=${vanId}`,
    });
    const signups = signupResponse.body.items || [];
    const signup = signups.find((s: any) => s.eventSignupId === eventSignupId);
    if (signup) {
      return mapEventSignup(signup);
    }
    // Fallback if we can't fetch the details
    return {
      eventSignupId,
      personVanId: vanId,
      personName: "Unknown",
      eventId,
      eventName: "Unknown",
      eventShiftId,
      shift: "Unknown",
      roleId,
      role: "Unknown",
      statusId,
      status: "Unknown",
      locationId: locationId || null,
      location: locationId ? "Unknown" : "",
      startTime: startTime || "",
      endTime: endTime || "",
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };
  },
});

// Update EventSignup formula
pack.addFormula({
  name: "UpdateEventSignup",
  description: "Update an existing event signup status in EveryAction",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventSignupId",
      description: "ID of the event signup to update",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "personVanId",
      description: "VAN ID of the person who signed up",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventShiftId",
      description: "ID of the event shift",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "roleId",
      description: "ID of the role",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "statusId",
      description: "New signup status code ID (e.g., 2, 30)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "locationId",
      description: "ID of the location",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: EventSignupSchema,
  execute: async function ([eventSignupId, personVanId, eventId, eventShiftId, roleId, statusId, locationId], context) {
    const updateData: any = {
      eventSignupId,
      person: { vanId: personVanId.toString() },
      event: { eventId },
      shift: { eventShiftId },
      role: { roleId },
      status: { statusId },
      location: { locationId },
    };
    await context.fetcher.fetch({
      method: "PUT",
      url: `https://api.securevan.com/v4/signups/${eventSignupId}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    // Fetch the updated signup to return full details
    const signupResponse = await context.fetcher.fetch({
      method: "GET",
      url: `https://api.securevan.com/v4/signups?eventId=${eventId}&vanId=${personVanId}`,
    });
    const signups = signupResponse.body.items || [];
    const signup = signups.find((s: any) => s.eventSignupId === eventSignupId);
    if (signup) {
      return mapEventSignup(signup);
    }
    // Fallback if we can't fetch the details
    return {
      eventSignupId,
      personVanId,
      personName: "Unknown",
      eventId,
      eventName: "Unknown",
      eventShiftId,
      shift: "Unknown",
      roleId,
      role: "Unknown",
      statusId,
      status: "Unknown",
      locationId: locationId || null,
      location: locationId ? "Unknown" : "",
      startTime: "",
      endTime: "",
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };
  },
});

// Delete EventSignup formula  
pack.addFormula({
  name: "DeleteEventSignup",
  description: "Delete an event signup from EveryAction",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventSignupId",
      description: "ID of the event signup to delete",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      eventSignupId: { type: coda.ValueType.Number },
    },
    idProperty: "eventSignupId",
    displayProperty: "eventSignupId",
  }),
  execute: async function ([eventSignupId], context) {
    await context.fetcher.fetch({
      method: "DELETE",
      url: `https://api.securevan.com/v4/signups/${eventSignupId}`,
    });
    // Return minimal object for Coda sync table row deletion
    return { eventSignupId };
  },
});

// Contacts sync table
pack.addSyncTable({
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
        description: "Filter by first name (required - matches contacts with first names starting with this value)",
        optional: false,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "lastName",
        description: "Filter by last name (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "email",
        description: "Filter by email (optional - matches emails starting with this value)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "phoneNumber",
        description: "Filter by phone number (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "city",
        description: "Filter by city (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "stateOrProvince",
        description: "Filter by state or province code (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "zipOrPostalCode",
        description: "Filter by ZIP or postal code (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "contactMode",
        description: "Filter by contact mode (Individual, Organization, etc.) (optional)",
        optional: true,
      }),
    ],
    execute: async function ([firstName, lastName, email, phoneNumber, city, stateOrProvince, zipOrPostalCode, contactMode], context) {
      let url = "https://api.securevan.com/v4/people";
      const queryParams = [];
      
      // firstName is required
      if (firstName) {
        queryParams.push(`firstName=${encodeURIComponent(firstName)}`);
      }
      
      if (lastName) {
        queryParams.push(`lastName=${encodeURIComponent(lastName)}`);
      }
      
      if (email) {
        queryParams.push(`email=${encodeURIComponent(email)}`);
      }
      
      if (phoneNumber) {
        queryParams.push(`phoneNumber=${encodeURIComponent(phoneNumber)}`);
      }
      
      if (city) {
        queryParams.push(`city=${encodeURIComponent(city)}`);
      }
      
      if (stateOrProvince) {
        queryParams.push(`stateOrProvince=${encodeURIComponent(stateOrProvince)}`);
      }
      
      if (zipOrPostalCode) {
        queryParams.push(`zipOrPostalCode=${encodeURIComponent(zipOrPostalCode)}`);
      }
      
      if (contactMode) {
        queryParams.push(`contactMode=${encodeURIComponent(contactMode)}`);
      }
      
      // Add pagination
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      
      // Add expansion for additional contact details
      queryParams.push("$expand=Addresses,Districts,Emails,Phones");
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      
      const data = response.body;
      const contacts = data.items || [];
      
      const result = contacts.map((contact: any) => {
        // Get primary address
        const primaryAddress = contact.addresses?.find((addr: any) => addr.isPreferred) || contact.addresses?.[0];
        
        // Get primary email and phone
        const primaryEmail = contact.emails?.find((email: any) => email.isPreferred) || contact.emails?.[0];
        const primaryPhone = contact.phones?.find((phone: any) => phone.isPreferred) || contact.phones?.[0];
        
        return {
          vanId: contact.vanId,
          firstName: contact.firstName,
          middleName: contact.middleName,
          lastName: contact.lastName,
          commonName: contact.commonName,
          officialName: contact.officialName,
          email: primaryEmail?.email,
          phoneNumber: primaryPhone?.phoneNumber,
          streetAddress: primaryAddress?.addressLine1,
          city: primaryAddress?.city,
          stateOrProvince: primaryAddress?.stateOrProvince,
          zipOrPostalCode: primaryAddress?.zipOrPostalCode,
          contactMode: contact.contactMode,
          dateCreated: contact.dateCreated,
          dateModified: contact.dateModified,
        };
      });
      
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      
      return {
        result,
        continuation,
      };
    },
  },
});

// Events sync table
pack.addSyncTable({
  name: "Events",
  description: "Sync events from EveryAction",
  identityName: "Event",
  schema: EventSchema,
  formula: {
    name: "SyncEvents",
    description: "Sync events from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "eventType",
        description: "Filter by event type (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "startDate",
        description: "Filter events starting from this date (YYYY-MM-DD format, optional)",
        optional: true,
      }),
    ],
    execute: async function ([eventType, startDate], context) {
      let url = "https://api.securevan.com/v4/events";
      const queryParams = [];
      
      if (eventType) {
        queryParams.push(`eventType=${encodeURIComponent(eventType)}`);
      }
      
      if (startDate) {
        queryParams.push(`startingAfter=${encodeURIComponent(startDate)}`);
      }
      
      // Add pagination
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      
      const data = response.body;
      const events = data.items || [];
      
      const result = events.map((event: any) => ({
        eventId: event.eventId,
        name: event.name,
        shortName: event.shortName,
        description: event.description,
        eventType: event.eventType?.name,
        startDate: event.startDate,
        endDate: event.endDate,
        publicWebsiteUrl: event.publicWebsiteUrl,
        voterRegistrationBatches: event.voterRegistrationBatches || [],
        notes: event.notes,
        dateCreated: event.dateCreated,
        dateModified: event.dateModified,
      }));
      
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      
      return {
        result,
        continuation,
      };
    },
  },
});

// SingleEventSignups sync table (helper table, just IDs and core fields)
pack.addSyncTable({
  name: "SingleEventSignups",
  description: "Sync event signups from EveryAction for a single event (IDs and core fields only)",
  identityName: "SingleEventSignup",
  schema: EventSignupSchema,
  formula: {
    name: "SyncSingleEventSignups",
    description: "Sync event signups from EveryAction for a single event (IDs and core fields only)",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "eventId",
        description: "Filter by specific event ID (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "vanId",
        description: "Filter by specific person VAN ID (optional)",
        optional: true,
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "status",
        description: "Filter by signup status (optional)",
        optional: true,
      }),
    ],
    execute: async function ([eventId, vanId, status], context) {
      if (!eventId && !vanId) {
        throw new coda.UserVisibleError("Either eventId or vanId parameter must be specified");
      }
      let url = "https://api.securevan.com/v4/signups";
      const queryParams = [];
      if (eventId) {
        queryParams.push(`eventId=${encodeURIComponent(eventId.toString())}`);
      }
      if (vanId) {
        queryParams.push(`vanId=${encodeURIComponent(vanId.toString())}`);
      }
      // Add pagination
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      const data = response.body;
      const signups = data.items || [];
      const filteredSignups = status 
        ? signups.filter((signup: any) => signup.status?.name === status)
        : signups;
      const result = filteredSignups.map(mapEventSignup);
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      return {
        result,
        continuation,
      };
    },
  },
});

// Locations sync table (read-only)
pack.addSyncTable({
  name: "Locations",
  description: "Sync locations from EveryAction (read-only - use CreateLocation action to add new locations)",
  identityName: "Location",
  schema: LocationSchema,
  formula: {
    name: "SyncLocations",
    description: "Sync locations from EveryAction",
    parameters: [],
    execute: async function ([], context) {
      let url = "https://api.securevan.com/v4/locations";
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      const data = response.body;
      const locations = data.items || [];
      const result = locations.map((loc: any) => {
        const address = loc.address;
        
        // Helper function to create full address string
        const createFullAddress = () => {
          if (!address) return "";
          const parts = [
            address.addressLine1,
            address.addressLine2,
            address.addressLine3,
            address.unitNo
          ].filter(Boolean);
          
          const streetAddress = parts.join(", ");
          const cityStateZip = [
            address.city,
            address.stateOrProvince,
            address.zipOrPostalCode
          ].filter(Boolean).join(", ");
          
          return [streetAddress, cityStateZip].filter(Boolean).join(", ");
        };
        
        return {
          locationId: loc.locationId,
          name: loc.name || "",
          displayName: loc.displayName || loc.name || "",
          addressLine1: address?.addressLine1 || "",
          addressLine2: address?.addressLine2 || "",
          addressLine3: address?.addressLine3 || "",
          unitNo: address?.unitNo || "",
          city: address?.city || "",
          stateOrProvince: address?.stateOrProvince || "",
          zipOrPostalCode: address?.zipOrPostalCode || "",
          countryCode: address?.countryCode || "",
          latitude: address?.geoLocation?.lat || null,
          longitude: address?.geoLocation?.lon || null,
          addressPreview: address?.preview || "",
          addressDisplayMode: address?.displayMode || "",
          isPreferred: address?.isPreferred || false,
          isBest: address?.isBest || false,
          notes: loc.notes || "",
          codes: loc.codes ? (typeof loc.codes === 'string' ? loc.codes : JSON.stringify(loc.codes)) : "",
          hasAddress: !!address,
          fullAddress: createFullAddress(),
        };
      });
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      return {
        result,
        continuation,
      };
    },
  },
});

// CreateLocation action formula (for quick location creation)
pack.addFormula({
  name: "SignupDetails",
  description: "Fetch enriched event signup details (including phone/email) for a given eventSignupId.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventSignupId",
      description: "The eventSignupId to fetch details for.",
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: SignupDetailsSchema,
  execute: async function ([eventSignupId], context) {
    const url = `https://api.securevan.com/v4/signups/${eventSignupId}?IncludePhoneAndEmail=true`;
    const response = await context.fetcher.fetch({
      method: "GET",
      url,
    });
    const signup = response.body;
    return {
      eventSignupId: signup.eventSignupId,
      personVanId: signup.person?.vanId,
      personName: `${signup.person?.firstName || ''} ${signup.person?.lastName || ''}`.trim(),
      personPhone: signup.person?.phones?.[0]?.phoneNumber || "",
      personEmail: signup.person?.emails?.[0]?.email || "",
      eventId: signup.event?.eventId,
      eventName: signup.event?.name,
      status: signup.status?.name,
      statusId: signup.status?.statusId,
      role: signup.role?.name,
      roleId: signup.role?.roleId,
      shift: signup.shift?.name,
      eventShiftId: signup.shift?.eventShiftId,
      startTime: signup.startTime,
      endTime: signup.endTime,
      location: signup.location?.name,
      locationId: signup.location?.locationId,
      dateCreated: signup.dateCreated,
      dateModified: signup.dateModified,
    };
  },
});

// Add a formula to get a breakdown of signups for an event by status and total count
pack.addFormula({
  name: "GetEventSignupBreakdown",
  description: "Get a breakdown of event signups for a given event, including total and per-status counts, or just for a specific status.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event to get signup breakdown for",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "(Optional) Signup status to count (e.g., Completed, Sched-Web, etc.). If provided, only the count for this status is returned.",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      total: { type: coda.ValueType.Number, description: "Total number of signups (or for the given status if specified)" },
      breakdown: coda.makeObjectSchema({
        properties: {},
        description: "Breakdown of signups by status (dynamic keys, omitted if status is provided)"
      }),
      status: { type: coda.ValueType.String, description: "Status filter applied (if any)" },
    },
    displayProperty: "total",
  }),
  execute: async function ([eventId, status], context) {
    let url = `https://api.securevan.com/v4/signups?eventId=${encodeURIComponent(eventId)}&$top=1000`;
    const response = await context.fetcher.fetch({
      method: "GET",
      url: url,
    });
    const signups: any[] = response.body.items || [];
    if (status) {
      // Case-insensitive match for status
      const filtered = signups.filter((s: any) => (s.status?.name || "").toLowerCase() === status.toLowerCase());
      return {
        total: filtered.length,
        status,
      };
    } else {
      const breakdown: Record<string, number> = {};
      for (const s of signups) {
        const st = (s.status?.name || "Unknown");
        breakdown[st] = (breakdown[st] || 0) + 1;
      }
      return {
        total: signups.length,
        breakdown,
      };
    }
  },
});

// Simple test formula for CLI validation
pack.addFormula({
  name: "TestEchoObject",
  description: "Returns a static test object for CLI validation.",
  parameters: [],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      foo: { type: coda.ValueType.String },
      bar: { type: coda.ValueType.Number },
    },
    displayProperty: "foo",
  }),
  execute: async function () {
    return { foo: "hello", bar: 42 };
  },
});

// EventsStats sync table
pack.addSyncTable({
  name: "EventsStats",
  description: "Aggregated statistics for each event, including total signups and counts by status.",
  identityName: "EventStats",
  schema: EventStatsSchema,
  formula: {
    name: "SyncEventsStats",
    description: "Sync event statistics from EveryAction",
    parameters: [],
    execute: async function ([], context) {
      let url = "https://api.securevan.com/v4/events?$top=50";
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      const data = response.body;
      const events = data.items || [];
      // For each event, fetch signups and aggregate status counts
      const results = [];
      for (const event of events) {
        const eventId = event.eventId;
        let signupsUrl = `https://api.securevan.com/v4/signups?eventId=${encodeURIComponent(eventId)}&$top=50`;
        let allSignups: any[] = [];
        let nextPage = true;
        let signupsPageUrl = signupsUrl;
        while (nextPage) {
          const signupsResp = await context.fetcher.fetch({
            method: "GET",
            url: signupsPageUrl,
          });
          const signupsData = signupsResp.body;
          const signups = signupsData.items || [];
          allSignups = allSignups.concat(signups);
          if (signupsData.nextPageLink) {
            signupsPageUrl = signupsData.nextPageLink;
          } else {
            nextPage = false;
          }
        }
        const statusCounts: Record<string, number> = {};
        for (const s of allSignups) {
          const status = (s.status?.name || "Unknown").toLowerCase();
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        }
        results.push({
          eventId,
          totalSignups: allSignups.length,
          completed: statusCounts["completed"] || 0,
          scheduled: statusCounts["scheduled"] || 0,
          cancelled: statusCounts["cancelled"] || 0,
          declined: statusCounts["declined"] || 0,
          noShow: statusCounts["no-show"] || 0,
          // Add more status columns as needed
        });
      }
      return {
        result: results,
      };
    },
  },
});

// ActiveEventSignups sync table (for Published events from All Actions & Events table)
pack.addSyncTable({
  name: "ActiveEventSignups",
  description: "Sync signups for published events from All Actions & Events table",
  identityName: "ActiveEventSignup",
  schema: EventSignupSchema,
  formula: {
    name: "SyncActiveEventSignups",
    description: "Sync signups for events marked as Published in All Actions & Events table",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "publishedEventIds",
        description: "Comma-separated EventIDs from Published events (from All Actions & Events table)",
        optional: false,
      }),
    ],
    execute: async function ([publishedEventIds], context) {
      if (!publishedEventIds || publishedEventIds.trim() === "") {
        return {
          result: [],
          continuation: undefined,
        };
      }
      
      // Parse the comma-separated event IDs
      const eventIds = publishedEventIds.split(',')
        .map(id => id.trim())
        .filter(id => id.length > 0)
        .map(id => parseInt(id))
        .filter(id => !isNaN(id));
      
      if (eventIds.length === 0) {
        return {
          result: [],
          continuation: undefined,
        };
      }
      
      console.log(`Syncing signups for ${eventIds.length} published events:`, eventIds);
      
      // Get signups for each published event using /signups API
      const allSignups = [];
      let hasMoreData = false;
      
      for (const eventId of eventIds) {
        try {
          let url = `https://api.securevan.com/v4/signups?eventId=${encodeURIComponent(eventId.toString())}`;
          
          // Add pagination
          url += "&$top=50";
          if (context.sync.continuation && context.sync.continuation[`event_${eventId}_skip`]) {
            url += `&$skip=${context.sync.continuation[`event_${eventId}_skip`]}`;
          }
          
          const signupsResponse = await context.fetcher.fetch({
            method: "GET",
            url: url,
          });
          
          const data = signupsResponse.body;
          const signups = data.items || [];
          
          if (signups.length > 0) {
            allSignups.push(...signups.map(mapEventSignup));
          }
          
          // Check if this event has more data
          if (data.nextPageLink) {
            hasMoreData = true;
          }
          
          console.log(`Fetched ${signups.length} signups for event ${eventId}`);
        } catch (error) {
          console.log(`Error fetching signups for event ${eventId}:`, error);
          // Continue with other events even if one fails
        }
      }
      
      console.log(`Total signups fetched: ${allSignups.length}`);
      
      // Simple continuation handling - if any event has more data, continue
      let continuation;
      if (hasMoreData) {
        continuation = { hasMore: true };
      }
      
      return {
        result: allSignups,
        continuation,
      };
    },
  },
});

// Generic POST formula
pack.addFormula({
  name: "POST",
  description: "Send a POST request to a specified URL with a JSON payload.",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "url",
      description: "The full URL of the request."
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "payload",
      description: "A JSON string payload (use Object() and ToJSON() in Coda)."
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "token",
      description: "(Optional) Bearer token for Authorization header.",
      optional: true
    }),
  ],
  resultType: coda.ValueType.String,
  execute: async function (params, context) {
    const [url, payload, token] = params;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const request: coda.FetchRequest = {
      url,
      method: "POST",
      headers,
      body: payload,
    };

    let response = await context.fetcher.fetch(request);

    if (response.status >= 200 && response.status < 300) {
      return typeof response.body === "string" ? response.body : JSON.stringify(response.body);
    }

    return `Error: ${response.status} - ${response.body}`;
  },
});

// EventTypes sync table
pack.addSyncTable({
  name: "EventTypes",
  description: "Sync event types from EveryAction",
  identityName: "EventType",
  schema: EventTypeSchema,
  formula: {
    name: "SyncEventTypes",
    description: "Sync event types from EveryAction",
    parameters: [],
    execute: async function ([], context) {
      const url = "https://api.securevan.com/v4/events/types";
      const response = await context.fetcher.fetch({
        method: "GET",
        url: url,
      });
      
      const eventTypes = response.body || [];
      
      const result = eventTypes.map((eventType: any) => ({
        eventTypeId: eventType.eventTypeId,
        name: eventType.name,
        canHaveMultipleShifts: eventType.canHaveMultipleShifts || false,
        canHaveMultipleLocations: eventType.canHaveMultipleLocations || false,
        canHaveGoals: eventType.canHaveGoals || false,
        canHaveRoleMaximums: eventType.canHaveRoleMaximums || false,
        canHaveRoleMinimums: eventType.canHaveRoleMinimums || false,
        canBeRepeatable: eventType.canBeRepeatable || false,
        color: eventType.color || "",
        isAtLeastOneLocationRequired: eventType.isAtLeastOneLocationRequired || false,
        defaultLocationId: eventType.defaultLocation?.locationId || null,
        defaultLocationName: eventType.defaultLocation?.name || "",
        isSharedWithMasterCommitteeByDefault: eventType.isSharedWithMasterCommitteeByDefault || false,
        isSharedWithChildCommitteesByDefault: eventType.isSharedWithChildCommitteesByDefault || false,
        isOnlineActionsAvailable: eventType.isOnlineActionsAvailable || false,
        roles: eventType.roles || [],
        statuses: eventType.statuses || [],
        rolesText: (eventType.roles || []).map((role: any) => role.name).join(", "),
        statusesText: (eventType.statuses || []).map((status: any) => status.name).join(", "),
      }));
      
      return {
        result,
      };
    },
  },
});

// CreateLocation action formula (for quick location creation)
pack.addFormula({
  name: "CreateLocation",
  description: "Create a new location in EveryAction",
  isAction: true,
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Location name (required)",
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "addressLine1",
      description: "Address line 1",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "addressLine2",
      description: "Address line 2",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "city",
      description: "City",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "stateOrProvince",
      description: "State or province",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "zipOrPostalCode",
      description: "ZIP or postal code",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "countryCode",
      description: "Country code (default: US)",
      optional: true,
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "notes",
      description: "Location notes",
      optional: true,
    }),
  ],
  resultType: coda.ValueType.Object,
  schema: LocationSchema,
  execute: async function ([name, addressLine1, addressLine2, city, stateOrProvince, zipOrPostalCode, countryCode, notes], context) {
    // Build the findOrCreate payload for EveryAction API
    const findOrCreateData: any = {
      name: name || "Campaign HQ", // Default name as per API docs
    };
    
    // Add address data if any address field is provided
    if (addressLine1 || city || stateOrProvince || zipOrPostalCode) {
      findOrCreateData.address = {
        addressLine1: addressLine1 || "",
        city: city || "",
        stateOrProvince: stateOrProvince || "",
        zipOrPostalCode: zipOrPostalCode || "",
      };
      
      // Only add addressLine2 if provided (not in the API example)
      if (addressLine2) {
        findOrCreateData.address.addressLine2 = addressLine2;
      }
      
      // Add country code if provided, otherwise don't include it
      if (countryCode) {
        findOrCreateData.address.countryCode = countryCode;
      }
    }
    
    // Use the findOrCreate endpoint
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/locations/findOrCreate",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(findOrCreateData),
    });
    
    // The findOrCreate endpoint returns the location object directly
    const location = response.body;
    
    if (!location || !location.locationId) {
      throw new coda.UserVisibleError("Could not create or find location - invalid response from EveryAction API");
    }
    
    // If notes were provided and this is a newly created location, update it with notes
    // (findOrCreate doesn't support notes parameter directly)
    if (notes && notes.trim()) {
      try {
        const updatePayload = {
          name: location.name,
          displayName: location.displayName || location.name,
          notes: notes,
          address: location.address
        };
        
        await context.fetcher.fetch({
          method: "PUT",
          url: `https://api.securevan.com/v4/locations/${location.locationId}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        });
        
        // Fetch the updated location
        const updatedResponse = await context.fetcher.fetch({
          method: "GET",
          url: `https://api.securevan.com/v4/locations/${location.locationId}`,
        });
        
        const updatedLocation = updatedResponse.body;
        return mapLocationResponse(updatedLocation);
      } catch (error) {
        // If notes update fails, return the location without notes
        console.warn("Failed to add notes to location:", error);
      }
    }
    
    return mapLocationResponse(location);
  },
});

// Helper function to map location response to schema format
function mapLocationResponse(location: any) {
  const address = location.address;
  
  // Helper function to create full address string
  const createFullAddress = () => {
    if (!address) return "";
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.addressLine3,
      address.unitNo
    ].filter(Boolean);
    
    const streetAddress = parts.join(", ");
    const cityStateZip = [
      address.city,
      address.stateOrProvince,
      address.zipOrPostalCode
    ].filter(Boolean).join(", ");
    
    return [streetAddress, cityStateZip].filter(Boolean).join(", ");
  };

  return {
    locationId: location.locationId,
    name: location.name || "",
    displayName: location.displayName || location.name || "",
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "",
    addressLine3: address?.addressLine3 || "",
    unitNo: address?.unitNo || "",
    city: address?.city || "",
    stateOrProvince: address?.stateOrProvince || "",
    zipOrPostalCode: address?.zipOrPostalCode || "",
    countryCode: address?.countryCode || "",
    latitude: address?.geoLocation?.lat || null,
    longitude: address?.geoLocation?.lon || null,
    addressPreview: address?.preview || "",
    addressDisplayMode: address?.displayMode || "",
    isPreferred: address?.isPreferred || false,
    isBest: address?.isBest || false,
    notes: location.notes || "",
    codes: location.codes ? (typeof location.codes === 'string' ? location.codes : JSON.stringify(location.codes)) : "",
    hasAddress: !!address,
    fullAddress: createFullAddress(),
  };
}