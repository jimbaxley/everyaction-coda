// EveryAction API Types
export interface EveryActionContact {
  vanId: number;
  firstName: string;
  lastName: string;
  emails?: Array<{
    email: string;
    type: string;
  }>;
  phones?: Array<{
    phoneNumber: string;
    phoneType: string;
  }>;
  addresses?: Array<{
    addressLine1: string;
    city: string;
    stateOrProvince: string;
    zipOrPostalCode: string;
  }>;
  dateCreated: string;
  dateModified: string;
}

export interface EveryActionApiResponse<T> {
  items?: T[];
  nextPageLink?: string;
  count?: number;
}