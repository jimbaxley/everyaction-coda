# EveryAction Coda Pack

This Coda Pack integrates with EveryAction CRM (formerly NGP VAN) via API calls, allowing users to manage contacts, events, and accounts seamlessly within Coda.

## Features

- **Contact Management**: Retrieve and create contacts in EveryAction
- **Event Management**: Create events and sync event data with filtering
- **Event Signups**: Complete signup management for events including creation, updates, and deletion
- **Account Management**: Sync accounts with type filtering
- **Sync Tables**: Real-time sync of data from EveryAction to Coda
- **Authentication**: Secure API integration using HTTP Basic authentication

## Pack Contents

### Formulas
- `GetContact(vanId)` - Retrieve a specific contact by VAN ID
- `CreateContact(firstName, lastName, email?)` - Create a new contact
- `CreateEvent(name, startDate, endDate, eventTypeId, shortName?, description?, locationId?, isOnlyEditableByCreatingUser?, roleId?, roleName?, isEventLead?, shiftName?, shiftStartTime?, shiftEndTime?)` - Create a new event (returns event ID)
- `CreateEventSignup(vanId, eventId, roleId, shiftId, status?, locationId?, startTime?, endTime?)` - Create a new event signup
- `UpdateEventSignup(eventSignupId, status?, roleId?, shiftId?, locationId?, startTime?, endTime?)` - Update an existing event signup
- `DeleteEventSignup(eventSignupId)` - Delete an event signup

### Sync Tables
- **Contacts** - Sync all contacts from EveryAction
- **Events** - Sync events with optional filtering by event type and start date
- **Accounts** - Sync accounts with optional filtering by account type
- **EventSignups** - Sync event signups with filtering by event ID, person VAN ID, or status

## Authentication Setup

This pack uses HTTP Basic authentication with EveryAction API credentials:

1. **Application Name**: Your registered application name in EveryAction
2. **API Key**: Your EveryAction API key

## Getting Started for Testing

### Prerequisites
- Node.js and npm installed
- Coda CLI installed (`npm install -g @codahq/packs-cli`)
- EveryAction API credentials

### Testing in Coda

1. **Register with Coda** (first time only):
   ```bash
   npx coda register
   ```
   Follow the prompts to get your API token from Coda.

2. **Create the pack**:
   ```bash
   npx coda create src/pack.ts
   ```

3. **Upload the pack**:
   ```bash
   npx coda upload src/pack.ts
   ```

4. **Test in a Coda doc**:
   - Open a new Coda document
   - Add the pack to your document
   - Connect your EveryAction account when prompted
   - Test the formulas and sync tables

### Local Development

- **Build**: `npm run build`
- **Validate**: `npx coda validate src/pack.ts`

## Pack Structure

```
src/
├── pack.ts              # Main pack file with all functionality
├── schemas/             # Data schemas (for reference)
│   ├── contact.ts
│   ├── account.ts
│   ├── event.ts
│   └── index.ts
├── sync-tables/         # Sync table implementations (for reference)
│   ├── contacts.ts
│   ├── accounts.ts
│   ├── events.ts
│   └── index.ts
└── types/              # TypeScript type definitions
    └── index.ts
```

## EveryAction API Integration

This pack integrates with EveryAction API v4:
- Base URL: `https://api.securevan.com/v4`
- Authentication: HTTP Basic (Application Name + API Key)
- Supported endpoints:
  - `/people` - Contact management
  - `/events` - Event data
  - `/accounts` - Account data

## Recent Updates

### Version 10 (Latest)
- **ENHANCED**: Contacts sync table now includes comprehensive contact fields (addresses, phone numbers, organization data)
- **REQUIRED**: Added firstName as required parameter for Contacts sync table (EveryAction API requirement)
- **EXPANDED**: Added filtering parameters for lastName, email, phone, city, state, ZIP, and contactMode
- **IMPROVED**: Added $expand parameter to retrieve complete contact details including addresses, emails, and phones
- **STRUCTURED**: Better mapping of primary addresses, emails, and phone numbers from expanded data

### Version 9
- **IMPROVED**: CreateEvent formula now returns just the event ID number for easy use in Coda table columns
- **SIMPLIFIED**: Removed complex object return, making the formula result directly usable as a column value
- **OPTIMIZED**: Eliminated unnecessary GET request after event creation since only the ID is needed

### Version 8
- **FIXED**: CreateEvent formula now properly extracts event ID from Location header in 201 response
- **IMPROVED**: Better error handling with clear messages for Location header parsing
- **ENHANCED**: More robust response handling that follows HTTP standards

### Version 7
- **FIXED**: CreateEvent formula response handling to properly extract event ID from API response
- **IMPROVED**: Added multiple fallback methods for event ID extraction

### Version 6
- **FIXED**: CreateEvent formula roles and shifts structure to match EveryAction API requirements
- **ENHANCED**: Updated parameters to include roleName, isEventLead, shiftName with proper data types
- **CORRECTED**: Shift times now use full ISO 8601 datetime format instead of time-only format

### Version 5
- **NEW**: Complete EventSignups functionality implemented
- **ADDED**: `CreateEventSignup` formula for registering people for events
- **ADDED**: `UpdateEventSignup` formula for modifying signup status, role, shift, location, and times
- **ADDED**: `DeleteEventSignup` formula for removing signups (with caution advised)
- **ADDED**: `EventSignups` sync table with filtering by event ID, person VAN ID, or status
- **ENHANCED**: Comprehensive signup management supporting all EveryAction signup statuses
- **SUPPORTS**: Multi-location events, role assignments, shift scheduling, and status tracking

### Version 4
- **FIXED**: Added required `roles` and `shifts` parameters to CreateEvent formula
- **ENHANCED**: Default role and shift values provided if not specified
- **COMPLIANT**: Now meets EveryAction API requirements for event creation

### Version 3
- **NEW**: Added `CreateEvent` formula for posting new events to EveryAction
- **SUPPORTS**: Full event creation with all required and optional parameters
- **INCLUDES**: Event type ID, location ID, dates, description, and edit permissions

### Version 2
- **FIXED**: URLSearchParams compatibility issue in Coda Pack runtime
- **IMPROVED**: Manual query string building for all sync tables
- **VALIDATED**: Pack now passes all validation checks
- **UPLOADED**: Successfully deployed to Coda

### Key Technical Fixes
1. Replaced `URLSearchParams` with manual query string building using `encodeURIComponent()`
2. Fixed Events sync table filtering parameters
3. Updated Accounts and Contacts sync tables with proper parameter handling
4. Ensured compatibility with Coda Pack runtime environment

## Testing Checklist

- [x] Pack builds successfully
- [x] Pack validates without errors
- [x] URLSearchParams compatibility issue resolved
- [x] Pack uploaded to Coda (version 10)
- [x] Authentication setup configured (HTTP Basic)
- [x] EventSignups functionality implemented and uploaded
- [ ] GetContact formula retrieves contact data
- [ ] CreateContact formula creates new contacts
- [ ] CreateEvent formula creates new events
- [ ] CreateEventSignup formula creates new signups
- [ ] UpdateEventSignup formula modifies existing signups
- [ ] DeleteEventSignup formula removes signups
- [ ] Contacts sync table loads data
- [ ] Events sync table loads with filtering
- [ ] Accounts sync table loads with filtering
- [ ] EventSignups sync table loads with filtering
- [ ] Pagination works for large datasets
- [ ] Error handling works for invalid credentials

## Support

For EveryAction API documentation: https://docs.ngpvan.com/docs/authentication

### Prerequisites

- Node.js (v14 or higher)
- Coda CLI tool (already installed)
- EveryAction API credentials

### Installation

1. Install dependencies:
```bash
npm install
```

2. Validate the pack:
```bash
npm run validate
```

3. Build the pack:
```bash
npm run build
```

## Available Commands

- `npm run validate` - Validate the pack definition
- `npm run build` - Build the pack locally
- `npm run execute` - Execute formulas for testing
- `npm run upload` - Upload the pack to Coda
- `npm run release` - Release a pack version

## Formulas

### GetContact
Retrieve a contact from EveryAction by VAN ID.

**Parameters:**
- `vanId` (number): The VAN ID of the contact to retrieve

**Returns:** Contact object with vanId, firstName, lastName, displayName, and email

### CreateContact
Create a new contact in EveryAction.

**Parameters:**
- `firstName` (string): Contact's first name
- `lastName` (string): Contact's last name  
- `email` (string, optional): Contact's email address

**Returns:** The new VAN ID of the created contact

### CreateEvent
Create a new event in EveryAction.

**Parameters:**
- `name` (string): Event name
- `startDate` (string): Event start date and time in ISO 8601 format (e.g., "2015-06-02T15:00:00-04:00")
- `endDate` (string): Event end date and time in ISO 8601 format (e.g., "2015-06-02T20:00:00-04:00")
- `eventTypeId` (number): Event type ID (required - get from EveryAction admin)
- `shortName` (string, optional): Event short name
- `description` (string, optional): Event description
- `locationId` (number, optional): Location ID for the event
- `isOnlyEditableByCreatingUser` (boolean, optional): Whether only the creating user can edit this event (default: false)
- `roleId` (number, optional): Role ID for event volunteers (defaults to 1 if not provided)
- `roleName` (string, optional): Role name (e.g., 'Host', 'Volunteer') (defaults to "Volunteer")
- `isEventLead` (boolean, optional): Whether this role is an event lead (default: false)
- `shiftName` (string, optional): Shift name (e.g., 'Setup', 'Main Event') (defaults to "Main Event")
- `shiftStartTime` (string, optional): Shift start date and time in ISO 8601 format (defaults to event start date)
- `shiftEndTime` (string, optional): Shift end date and time in ISO 8601 format (defaults to event end date)

**Returns:** The new event ID as a number (e.g., 450823)

**Example:**
```
CreateEvent(
  "Neighbors Calling Neighbors",
  "2015-06-02T15:00:00-04:00", 
  "2015-06-02T20:00:00-04:00",
  143856,
  "NeighborCall",
  "Come help get the word out about our great campaign.",
  273,
  false,
  1,
  "Host",
  true,
  "Main Event",
  "2015-06-02T15:00:00-04:00",
  "2015-06-02T20:00:00-04:00"
)
```

**Note:** EveryAction requires at least one role and one shift for every event. If not provided, defaults will be used.

## EventSignups Management

### CreateEventSignup Formula
Create a new event signup in EveryAction.

**Parameters:**
- `vanId` (number): VAN ID of the person to sign up
- `eventId` (number): ID of the event to sign up for  
- `roleId` (number): Role ID for the signup
- `shiftId` (number): Shift ID for the signup
- `status` (string, optional): Signup status (default: "Invited")
- `locationId` (number, optional): Location ID for multi-location events
- `startTime` (string, optional): Start time (ISO format or HH:MM)
- `endTime` (string, optional): End time (ISO format or HH:MM)

**Returns:** Complete signup object with eventSignupId, person details, event details, status, role, and shift information

**Example:**
```
CreateEventSignup(
  12345,     // vanId
  67890,     // eventId
  1,         // roleId  
  2,         // shiftId
  "Scheduled",
  273,       // locationId
  "15:00",   // startTime
  "20:00"    // endTime
)
```

### UpdateEventSignup Formula
Update an existing event signup.

**Parameters:**
- `eventSignupId` (number): ID of the signup to update
- `status` (string, optional): New signup status
- `roleId` (number, optional): New role ID
- `shiftId` (number, optional): New shift ID  
- `locationId` (number, optional): New location ID
- `startTime` (string, optional): New start time
- `endTime` (string, optional): New end time

**Returns:** Updated signup object

### DeleteEventSignup Formula
Delete an event signup from EveryAction.

**Parameters:**
- `eventSignupId` (number): ID of the signup to delete

**Returns:** Success message

**Note:** Use with caution as this action is irreversible. Consider updating the status to "Declined" or "No Show" instead of deleting.

## Sync Tables

### EventSignups Sync Table
Syncs event signups from EveryAction with filtering options.

**Parameters:**
- `eventId` (number, optional): Filter by specific event ID
- `vanId` (number, optional): Filter by specific person VAN ID  
- `status` (string, optional): Filter by signup status

**Note:** Either `eventId` or `vanId` must be specified as required by the EveryAction API.

**Example Usage:**
- Get all signups for event 67890: `eventId=67890`
- Get all signups for person 12345: `vanId=12345`
- Get confirmed signups for event 67890: `eventId=67890, status=Confirmed`

## Sync Tables

### Contacts
Syncs contact data from EveryAction into a Coda table with real-time updates.

**Parameters:**
- `firstName` (string, required): Filter by first name - matches contacts with first names starting with this value
- `lastName` (string, optional): Filter by last name
- `email` (string, optional): Filter by email - matches emails starting with this value
- `phoneNumber` (string, optional): Filter by phone number
- `city` (string, optional): Filter by city
- `stateOrProvince` (string, optional): Filter by state or province code (2-3 characters)
- `zipOrPostalCode` (string, optional): Filter by ZIP or postal code
- `contactMode` (string, optional): Filter by contact mode (Individual, Organization, etc.)

**Includes:**
- Basic contact info (name, email, phone)
- Full address information (street, city, state, ZIP)
- Organization fields (commonName, officialName)
- Contact timestamps (dateCreated, dateModified)
- Expanded data from addresses, emails, and phones collections

**Note:** firstName parameter is required by the EveryAction API.

## Authentication

This pack uses EveryAction's API with bearer token authentication. You'll need to:

1. Obtain an API key from your EveryAction account
2. Configure the authentication when installing the pack in Coda
3. Reference the [EveryAction API documentation](https://docs.ngpvan.com/docs/authentication) for details

## Development

The pack is structured with:

- `src/pack.ts`: Main pack definition and configuration
- `src/schemas/`: Data schemas for EveryAction objects
- `src/formulas/`: Individual formula implementations  
- `src/sync-tables/`: Sync table definitions
- `src/types/`: TypeScript type definitions

## Next Steps

1. **Authentication Setup**: Configure your EveryAction API credentials
2. **Testing**: Use `npm run execute` to test formulas locally
3. **Upload**: Use `npm run upload` to upload to Coda for testing
4. **Expansion**: Add more formulas for accounts, events, and other EveryAction entities

## API Endpoints

The pack integrates with these EveryAction API endpoints:

- `GET /v4/people/{vanId}` - Retrieve contact details
- `POST /v4/people` - Create new contact
- `GET /v4/people` - List contacts (for sync table)
- `POST /v4/events` - Create new event
- `GET /v4/events/{eventId}` - Retrieve event details
- `GET /v4/events` - List events (for sync table)
- `GET /v4/accounts` - List accounts (for sync table)
- `GET /v4/signups` - List signups (for sync table)
- `POST /v4/signups` - Create new signup
- `PUT /v4/signups/{eventSignupId}` - Update existing signup
- `DELETE /v4/signups/{eventSignupId}` - Delete signup

Base URL: `https://api.securevan.com/v4`
    - **index.ts**: Exports types used throughout the pack.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd my-crm-pack
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Build the pack**:
   ```
   coda build
   ```

4. **Run the pack**:
   ```
   coda run
   ```

## Usage

- Use the provided formulas to interact with the CRM's API for managing contacts and accounts.
- Sync tables will automatically fetch and update data from the CRM.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.