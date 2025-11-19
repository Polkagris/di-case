export const checkAddress = async (streetName: string, cityName: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const URL = `https://ws.di.no/ws/json/addressHelper/v-2/NO/streetSearch/${streetName},${cityName}?apiKey=${apiKey}`;

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Reponse not OK - Could not get address.");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("checkAddress failed:", error);
    throw new Error("checkAddress failed - Could not get address.");
  }
};
