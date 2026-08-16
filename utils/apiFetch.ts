export async function apiFetch(
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  const envUrls = process.env.BACKEND_API_URLS || "https://rentnestapi2.vercel.app/api/v1,https://rentnestapi3.vercel.app/api/v1,https://rentnestapi4.vercel.app/api/v1";
  const urls = envUrls.split(",").map(u => u.trim().replace(/\/$/, ""));
  const path = endpoint.startsWith("/") ? endpoint : "/" + endpoint;

  // Race all URLs in parallel — first successful response wins.
  // This avoids sequential timeouts (3 × 8s = 24s) that exceed Vercel's 10s limit.
  const racePromises = urls.map(async (baseUrl) => {
    const url = baseUrl + path;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s per attempt

    try {
      const response = await fetch(url, {
        ...init,
        signal: init?.signal || controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from ${baseUrl}`);
      }
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn("[apiFetch] Failed fetching from " + baseUrl + ": " + (error instanceof Error ? error.message : "Timeout/Unknown"));
      throw error;
    }
  });

  try {
    // Promise.any resolves with the first fulfilled promise
    return await Promise.any(racePromises);
  } catch (aggregateError) {
    throw new Error("All backend API URLs failed to respond.");
  }
}
