import { checkAddress } from "../queries/checkAddress";
import { streetNumberSearch } from "../queries/streetNumberSearch";
import { Street, StreetNumberResponse } from "../types/types";

export const checkForValidAddress = async (
  streetName: string,
  cityName: string,
  streetNumber: number,
  entranceLetter: string
) => {
  // setIsLoading(true);
  /*   try { */
  const streetSearchResult = await checkAddress(streetName, cityName);
  const streetIds = streetSearchResult.streets?.map((street: Street) => {
    return street.streetIds;
  });
  const streetNumberSearchResult: StreetNumberResponse =
    await streetNumberSearch(streetIds);
  console.log("streetIds from query:", streetIds);
  console.log("streetNumberSearchResult from query:", streetNumberSearchResult);
  console.log(
    "streetNumberSearchResult.streetNumbers from query  results ----:",
    streetNumberSearchResult.streetNumbers
  );
  // filter streetNumberSearchResult for correct number
  const matchingStreetNumberStreet =
    streetNumberSearchResult?.streetNumbers?.filter(
      (street) => street.streetNo == streetNumber
    );
  const matchingWithEntranceLetter = matchingStreetNumberStreet?.find(
    (street) => street.entrance?.toUpperCase() == entranceLetter.toUpperCase()
  );
  console.log("MATCH:", matchingStreetNumberStreet);
  console.log("MATCH with LETTER:", matchingWithEntranceLetter);
  /*   const result = matchingWithEntranceLetter
    ? [matchingWithEntranceLetter]
    : matchingStreetNumberStreet; */

  //setMatchingStreet(result);
  if (matchingWithEntranceLetter) {
    return [matchingWithEntranceLetter];
  }

  return matchingStreetNumberStreet;
  /*   } finally {
    setIsLoading(false);
  } */
};
