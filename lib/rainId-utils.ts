import Cookies from "js-cookie";

export const fetchAndStoreRainId = async (rainUsername: string): Promise<string | null> => {
  try {
    console.log("Fetching Rain ID for username:", rainUsername);

    const response = await fetch(`/api/user/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rainUsername }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Rain ID");
    }

    const data = await response.json();
    const rainId = data.rainId || "";

    console.log("Rain ID fetched:", data.rainId);

    // Store Rain ID in cookies
    Cookies.set("rainId", rainId, { path: "/", secure: true, sameSite: "Strict" });

    console.log("Storing Rain ID in cookies:", rainId);

    return rainId;
  } catch (error) {
    console.error("Error fetching Rain ID:", error);
    return null;
  }
};
