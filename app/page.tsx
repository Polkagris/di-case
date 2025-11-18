"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { checkAddress } from "./queries/checkAddress";
import { useState } from "react";
import { streetNumberSearch } from "./queries/streetNumberSearch";
import { Street, StreetNumber, StreetNumberResponse } from "./types/types";
import { Check, TriangleAlert } from "lucide-react";

export default function Home() {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState();
  const [cityName, setCityName] = useState("");
  const [entranceLetter, setEntranceLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchingStreet, setMatchingStreet] = useState<StreetNumber[]>([]);
  console.log("streetname:", streetName);
  console.log("entranceLetter:", entranceLetter);
  console.log("matchingStreet:", matchingStreet);

  const checkForValidAddress = async (streetName: string, cityName: string) => {
    setIsLoading(true);
    try {
      const streetSearchResult = await checkAddress(streetName, cityName);
      const streetIds = streetSearchResult.streets?.map((street: Street) => {
        return street.streetIds;
      });
      const streetNumberSearchResult: StreetNumberResponse =
        await streetNumberSearch(streetIds);
      console.log("streetIds from query:", streetIds);
      console.log(
        "streetNumberSearchResult from query:",
        streetNumberSearchResult
      );
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
        (street) =>
          street.entrance?.toUpperCase() == entranceLetter.toUpperCase()
      );
      console.log("MATCH:", matchingStreetNumberStreet);
      console.log("MATCH with LETTER:", matchingWithEntranceLetter);
      const result = matchingWithEntranceLetter
        ? [matchingWithEntranceLetter]
        : matchingStreetNumberStreet;

      setMatchingStreet(result);
      return matchingStreetNumberStreet;
    } finally {
      setIsLoading(false);
    }
  };

  const matchedAddressInfo = <div></div>;
  const moreThanOneMatchMessage = (
    <div className="flex w-2/5 mt-3">
      <TriangleAlert className="mr-2 h-12 w-12" />
      <p>
        Your search matched with more than one address. Use the letter-input
        field to specify house number letter
      </p>
    </div>
  );
  const matchingStreetInfo = (
    <div className="flex flex-col w-2/5 mt-4">
      <div className="flex ">
        <Check className="mr-2 h-6 w-6" />
        <p>Your search resultet in a valid address.</p>
      </div>
      <div className="flex mt-3">
        <p>Full address name: </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col w-2/5 ">
        <h1>Test address</h1>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              onChange={(e) => setStreetName(e.target.value)}
              placeholder="address"
              value={streetName}
              required
            />
            <input
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="address number"
              value={streetNumber}
              required
            />
          </div>
          <div className="flex">
            <input
              onChange={(e) => setCityName(e.target.value)}
              placeholder="city"
              value={cityName}
              required
            />
            <input
              onChange={(e) => setEntranceLetter(e.target.value)}
              placeholder="abc"
              value={entranceLetter}
            />
          </div>
        </div>
        {isLoading ? (
          <Button
            disabled
            onClick={() => checkForValidAddress(streetName, cityName)}
          >
            <Spinner /> Check
          </Button>
        ) : (
          <Button onClick={() => checkForValidAddress(streetName, cityName)}>
            Check
          </Button>
        )}
      </div>
      {matchingStreet?.length > 1 && moreThanOneMatchMessage}
      {matchingStreet?.length === 1 && matchingStreetInfo}
    </div>
  );
}
