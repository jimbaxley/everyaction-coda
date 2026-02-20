import * as coda from "@codahq/packs-sdk";

export const ContactSchema = coda.makeObjectSchema({
  properties: {
    vanId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the contact in EveryAction",
    },
    firstName: {
      type: coda.ValueType.String,
      description: "Contact's first name",
    },
    middleName: {
      type: coda.ValueType.String,
      description: "Contact's middle name",
    },
    lastName: {
      type: coda.ValueType.String,
      description: "Contact's last name",
    },
    email: {
      type: coda.ValueType.String,
      description: "Primary email address",
    },
    phone: {
      type: coda.ValueType.String,
      description: "Primary phone number",
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the contact was created",
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the contact was last modified",
    },
    dateOfBirth: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      description: "Contact's date of birth",
    },
    sex: {
      type: coda.ValueType.String,
      description: "Contact's gender/sex",
    },
    employer: {
      type: coda.ValueType.String,
      description: "Contact's employer",
    },
    occupation: {
      type: coda.ValueType.String,
      description: "Contact's occupation",
    },
    title: {
      type: coda.ValueType.String,
      description: "Contact's title/prefix",
    },
    suffix: {
      type: coda.ValueType.String,
      description: "Contact's suffix",
    },
    addresses: {
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.Object,
        properties: {
          addressId: { type: coda.ValueType.Number },
          addressLine1: { type: coda.ValueType.String },
          addressLine2: { type: coda.ValueType.String },
          addressLine3: { type: coda.ValueType.String },
          city: { type: coda.ValueType.String },
          stateOrProvince: { type: coda.ValueType.String },
          zipOrPostalCode: { type: coda.ValueType.String },
          countryCode: { type: coda.ValueType.String },
          type: { type: coda.ValueType.String },
          isPreferred: { type: coda.ValueType.Boolean },
        },
      },
      description: "Contact addresses",
    },
    emails: {
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.Object,
        properties: {
          emailId: { type: coda.ValueType.Number },
          email: { type: coda.ValueType.String },
          type: { type: coda.ValueType.String },
          isPreferred: { type: coda.ValueType.Boolean },
        },
      },
      description: "Contact email addresses",
    },
    phones: {
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.Object,
        properties: {
          phoneId: { type: coda.ValueType.Number },
          phoneNumber: { type: coda.ValueType.String },
          phoneType: { type: coda.ValueType.String },
          isPreferred: { type: coda.ValueType.Boolean },
          ext: { type: coda.ValueType.String },
        },
      },
      description: "Contact phone numbers",
    },
    primaryAddress: {
      type: coda.ValueType.String,
      description: "Primary address formatted as single string",
    },
    primaryEmail: {
      type: coda.ValueType.String,
      description: "Primary email address",
    },
    primaryPhone: {
      type: coda.ValueType.String,
      description: "Primary phone number",
    },
    organizationName: {
      type: coda.ValueType.String,
      description: "Organization/committee name if this is an organization contact",
    },
    organizationType: {
      type: coda.ValueType.String,
      description: "Type of organization",
    },
    isOrganization: {
      type: coda.ValueType.Boolean,
      description: "Whether this contact represents an organization",
    },
    // Expanded arrays that can be requested from the /people endpoint
    codes: {
      fromKey: "codes",
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.Object,
        properties: {
          codeId: { type: coda.ValueType.Number },
          parentCodeId: { type: coda.ValueType.Number },
          name: { type: coda.ValueType.String },
          codeType: { type: coda.ValueType.String },
          codePath: { type: coda.ValueType.String },
          createdByName: { type: coda.ValueType.String },
          dateCreated: {
            type: coda.ValueType.String,
            codaType: coda.ValueHintType.DateTime,
          },
        },
      },
      description: "List of codes assigned to the contact (requires $expand=codes)",
    },
    customFields: {
      fromKey: "customFields",
      type: coda.ValueType.Array,
      items: {
        type: coda.ValueType.Object,
        properties: {
          customFieldId: { type: coda.ValueType.Number },
          customFieldGroupId: { type: coda.ValueType.Number },
          assignedValue: { type: coda.ValueType.String },
          customField: {
            type: coda.ValueType.Object,
            properties: {
              customFieldId: { type: coda.ValueType.Number },
              customFieldParentId: { type: coda.ValueType.Number },
              customFieldName: { type: coda.ValueType.String },
              customFieldGroupId: { type: coda.ValueType.Number },
              customFieldGroupName: { type: coda.ValueType.String },
              customFieldGroupType: { type: coda.ValueType.String },
              customFieldTypeId: { type: coda.ValueType.String },
              isEditable: { type: coda.ValueType.Boolean },
              maxTextboxCharacters: { type: coda.ValueType.Number },
              availableValues: {
                type: coda.ValueType.Array,
                items: {
                  type: coda.ValueType.Object,
                  properties: {
                    id: { type: coda.ValueType.Number },
                    name: { type: coda.ValueType.String },
                    parentValueId: { type: coda.ValueType.Number },
                  },
                },
              },
              isExportable: { type: coda.ValueType.Boolean },
            },
          },
        },
      },
      description: "Custom fields attached to the contact (requires $expand=customFields)",
    },
  },
  displayProperty: "firstName",
  idProperty: "vanId",
  featuredProperties: ["firstName", "lastName", "primaryEmail", "primaryPhone", "primaryAddress"],
});