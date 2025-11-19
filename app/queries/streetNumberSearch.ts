export const streetNumberSearch = async (streetIds: number[]) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const URL = `https://ws.di.no/ws/json/addressHelper/v-2/NO/streetNumberSearch/${streetIds}?apiKey=${apiKey}&limit=${100}`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Reponse not OK - Could not get street number.");
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("streetNumberSearch failed:", error);
    throw new Error("StreetNumberSearch failed - Could not get address number");
  }
};
