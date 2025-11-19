"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { StreetNumber } from "./types/types";
import { Check, TriangleAlert, Bird } from "lucide-react";
import { checkForValidAddress } from "./utils/checkForValidAddress";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [cityName, setCityName] = useState("");
  const [entranceLetter, setEntranceLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchingStreet, setMatchingStreet] = useState<StreetNumber[] | null>(
    null
  );

  const handleValidationCheck = async () => {
    setIsLoading(true);
    try {
      const result = await checkForValidAddress(
        streetName,
        cityName,
        streetNumber ?? "",
        entranceLetter
      );
      setMatchingStreet(result);
    } finally {
      setIsLoading(false);
    }
  };

  const moreThanOneMatchMessage = (
    <div className="flex mt-3">
      <div className="flex w-1/6 md:w-1/8">
        <TriangleAlert className="mr-2 h-12 w-12" />
      </div>
      <div className="flex flex-1">
        <p>
          Your search matched with more than one address. Use the letter-input
          field to specify house number letter
        </p>
      </div>
    </div>
  );
  const matchingStreetInfo = (
    <div className="flex flex-col w-full mt-4 items-center gap-4">
      <div className="flex">
        <div className="flex w-1/8 ">
          <Check className="mr-2 h-6 w-6" />
        </div>
        <div className="flex flex-1">
          <p>Your search resultet in a valid address.</p>
        </div>
      </div>

      <div className="flex flex-1">
        <p>
          Full address name: {streetName} {streetNumber} {entranceLetter}
        </p>
      </div>
    </div>
  );
  const noMatchInfo = (
    <div className="flex 2-full mt-4 ">
      <div className="flex w-1/6">
        <Bird className="mr-2 h-8 w-8" />
      </div>
      <div className="flex flex-1">
        <p>
          Your search gave no results. Please try a different address, or add a
          different number.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-full w-full items-center mt-8 md:w-1/2 md:m-auto md:mt-8">
      <div className="flex flex-col w-full px-4 gap-4">
        <h1 className="text-2xl">Validate address</h1>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <Label htmlFor="streetName">Address name</Label>
            <Input
              onChange={(e) => setStreetName(e.target.value)}
              placeholder="address"
              value={streetName}
              required
            />
            <Label htmlFor="streetNumber">Address number</Label>
            <Input
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="address number"
              value={streetNumber}
              required
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Label htmlFor="city">City/town</Label>
            <Input
              onChange={(e) => setCityName(e.target.value)}
              placeholder="city"
              value={cityName}
              required
            />
            <Label htmlFor="city">Address letter</Label>
            <Input
              onChange={(e) => setEntranceLetter(e.target.value)}
              placeholder="abc"
              value={entranceLetter}
            />
          </div>
        </div>
        {isLoading ? (
          <Button disabled>
            <Spinner /> Validate
          </Button>
        ) : (
          <Button onClick={() => handleValidationCheck()}>Validate</Button>
        )}
      </div>
      <div className="flex w-full justify-center px-3">
        {matchingStreet &&
          matchingStreet?.length > 1 &&
          moreThanOneMatchMessage}
        {matchingStreet && matchingStreet?.length === 1 && matchingStreetInfo}
        {matchingStreet && matchingStreet?.length === 0 && noMatchInfo}
      </div>
    </div>
  );
}
