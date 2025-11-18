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

export default function Home() {
  const [streetName, setStreetName] = useState("");
  const [cityName, setCityName] = useState("");
  console.log("streetname:", streetName);

  const checkForValidAddress = async (streetName: string, cityName: string) => {
    const streetSearchResult = await checkAddress(streetName, cityName);
    const streetIds = streetSearchResult.streets?.map((street: Street) => {
      return street.streetIds;
    });
    const streetNumberSearchResult = await streetNumberSearch(streetIds);
    console.log("streetIds from query:", streetIds);
    console.log(
      "streetNumberSearchResult from query:",
      streetNumberSearchResult
    );
    return streetIds;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1>Test address</h1>
        <input
          onChange={(e) => setStreetName(e.target.value)}
          placeholder="adress"
          value={streetName}
          required
        />
        <input
          onChange={(e) => setCityName(e.target.value)}
          placeholder="city"
          value={cityName}
          required
        />
        <Button onClick={() => checkForValidAddress(streetName, cityName)}>
          Check
        </Button>
      </div>
    </div>
  );
}
