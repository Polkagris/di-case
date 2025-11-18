"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAddress } from "./queries/checkAddress";
import { useState } from "react";
import { streetNumberSearch } from "./queries/streetNumberSearch";

type Street = {
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

export default function Home() {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState();
  const [cityName, setCityName] = useState("");
  console.log("streetname:", streetName);

  const checkForValidAddress = async (streetName: string, cityName: string) => {
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
      streetNumberSearchResult?.streetNumbers?.find(
        (street) => street.streetNo == streetNumber
      );
    console.log("MATCH:", matchingStreetNumberStreet);
    return matchingStreetNumberStreet;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
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
          </div>
        </div>

        <Button onClick={() => checkForValidAddress(streetName, cityName)}>
          Check
        </Button>
      </div>
    </div>
  );
}
