import * as coda from "@codahq/packs-sdk";

export const EventTypeSchema = coda.makeObjectSchema({
  properties: {
    eventTypeId: {
      type: coda.ValueType.Number,
      description: "Unique identifier for the event type",
    },
    name: {
      type: coda.ValueType.String,
      description: "Name of the event type",
    },
    canHaveMultipleShifts: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can have multiple shifts",
    },
    canHaveMultipleLocations: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can have multiple locations",
    },
    canHaveGoals: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can have goals",
    },
    canHaveRoleMaximums: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can have role maximums",
    },
    canHaveRoleMinimums: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can have role minimums",
    },
    canBeRepeatable: {
      type: coda.ValueType.Boolean,
      description: "Whether this event type can be repeatable",
    },
    color: {
      type: coda.ValueType.String,
      description: "Color code for the event type",
    },
    isAtLeastOneLocationRequired: {
      type: coda.ValueType.Boolean,
      description: "Whether at least one location is required",
    },
    defaultLocationId: {
      type: coda.ValueType.Number,
      description: "Default location ID for this event type",
    },
    defaultLocationName: {
      type: coda.ValueType.String,
      description: "Default location name for this event type",
    },
    isSharedWithMasterCommitteeByDefault: {
      type: coda.ValueType.Boolean,
      description: "Whether shared with master committee by default",
    },
    isSharedWithChildCommitteesByDefault: {
      type: coda.ValueType.Boolean,
      description: "Whether shared with child committees by default",
    },
    isOnlineActionsAvailable: {
      type: coda.ValueType.Boolean,
      description: "Whether online actions are available for this event type",
    },
    roles: {
      type: coda.ValueType.Array,
      items: coda.makeObjectSchema({
        properties: {
          roleId: {
            type: coda.ValueType.Number,
            description: "Role ID",
          },
          name: {
            type: coda.ValueType.String,
            description: "Role name",
          },
          isEventLead: {
            type: coda.ValueType.Boolean,
            description: "Whether this role is an event lead",
          },
        },
        displayProperty: "name",
        idProperty: "roleId",
      }),
      description: "Available roles for this event type",
    },
    statuses: {
      type: coda.ValueType.Array,
      items: coda.makeObjectSchema({
        properties: {
          statusId: {
            type: coda.ValueType.Number,
            description: "Status ID",
          },
          name: {
            type: coda.ValueType.String,
            description: "Status name",
          },
        },
        displayProperty: "name",
        idProperty: "statusId",
      }),
      description: "Available statuses for this event type",
    },
    rolesText: {
      type: coda.ValueType.String,
      description: "Comma-separated list of role names",
    },
    statusesText: {
      type: coda.ValueType.String,
      description: "Comma-separated list of status names",
    },
  },
  displayProperty: "name",
  idProperty: "eventTypeId",
});
