# EveryAction Coda Pack

This Coda Pack integrates with EveryAction CRM (formerly NGP VAN) via API calls, allowing users to manage contacts, events, and accounts seamlessly within Coda.

## Features

- Contact, event, and signup management
- Sync tables for contacts, events, accounts, and signups
- Secure API integration using HTTP Basic authentication

## Pack Contents

### Formulas
- `GetContact(vanId)` - Retrieve a specific contact by VAN ID
- `CreateContact(firstName, lastName, email?)` - Create a new contact
- `CreateEvent(...)` - Create a new event (see pack for full parameter list)
- `CreateEventSignup(...)` - Create a new event signup
- `UpdateEventSignup(...)` - Update an existing event signup
- `DeleteEventSignup(eventSignupId)` - Delete an event signup

### Sync Tables
- **Contacts** - Sync all contacts from EveryAction
- **Events** - Sync events with optional filtering
- **Accounts** - Sync accounts with optional filtering
- **EventSignups** - Sync event signups with filtering by event ID, person VAN ID, or status

## Authentication Setup

This pack uses HTTP Basic authentication with EveryAction API credentials. You will need:
- Application Name (from EveryAction)
- API Key (from EveryAction)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the pack:
   ```bash
   npm run build
   ```
3. Validate the pack:
   ```bash
   npx coda validate src/pack.ts
   ```
4. Upload the pack to Coda:
   ```bash
   npx coda upload src/pack.ts
   ```
5. Add the pack to your Coda doc and connect your EveryAction account when prompted.

## Pack Structure

```
src/
├── pack.ts              # Main pack file with all functionality
├── schemas/             # Data schemas (for reference)
├── sync-tables/         # Sync table implementations
├── types/               # TypeScript type definitions
```

## Google Apps Script Integration (Bonus)

A Google Apps Script is provided in the `src` directory for advanced users who want to sync or push data from Google Sheets to Coda. See `src/google-coda.js` for details and usage instructions. This script allows you to:
- Combine data from multiple sheets
- Push data to Coda tables
- Add pause/resume controls for syncing

## API Endpoints Used

- `/people` - Contact management
- `/events` - Event data
- `/accounts` - Account data
- `/signups` - Signup management

Base URL: `https://api.securevan.com/v4`

## Support

For EveryAction API documentation: https://docs.ngpvan.com/docs/authentication

## License

MIT License