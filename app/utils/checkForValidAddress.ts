import { checkAddress } from "../queries/checkAddress";
import { streetNumberSearch } from "../queries/streetNumberSearch";
import { Street, StreetNumberResponse } from "../types/types";

export const checkForValidAddress = async (
  streetName: string,
  cityName: string,
  streetNumber: number | string,
  entranceLetter: string
) => {
  const streetSearchResult = await checkAddress(streetName, cityName);
  const streetIds = streetSearchResult.streets?.map((street: Street) => {
    return street.streetIds;
  });
  const streetNumberSearchResult: StreetNumberResponse =
    await streetNumberSearch(streetIds);

  const matchingStreetNumberStreet =
    streetNumberSearchResult?.streetNumbers?.filter(
      (street) => street.streetNo == streetNumber
    );
  const matchingWithEntranceLetter = matchingStreetNumberStreet?.find(
    (street) => street.entrance?.toUpperCase() == entranceLetter.toUpperCase()
  );

  if (matchingWithEntranceLetter) {
    return [matchingWithEntranceLetter];
  }

  return matchingStreetNumberStreet;
};
