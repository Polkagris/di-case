"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAddress } from "./queries/checkAddress";
import { useState } from "react";

export default function Home() {
  const [streetName, setStreetName] = useState("");
  console.log("streetname:", streetName);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1>Test adress</h1>
        <input
          onChange={(e) => setStreetName(e.target.value)}
          placeholder="adress"
          value={streetName}
        />
        <Button onClick={() => checkAddress(streetName)}>Check</Button>
      </div>
    </div>
  );
}
