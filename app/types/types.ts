export type Street = {
  city: string;
  countryCode: string;
  isAliasMatch: string;
  streetIds: number[];
  streetName: string;
};

export type StreetResponse = {
  streets: Street[];
  totalResults: number;
};

export type StreetNumber = {
  addressId: number;
  deliveryPointId: number;
  duplicateNumberAndEntrance: boolean;
  entrance: string | null;
  houseType: string;
  latitude: number;
  longitude: number;
  postalCode: string;
  showHouseholds: boolean;
  streetNo: number;
};

export type StreetNumberResponse = {
  streetNumbers: StreetNumber[];
};
