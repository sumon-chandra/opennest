export async function apiFetch(
  endpoint: string,
  init?: RequestInit
): Promise<Response> {
  // const envUrls = "http://localhost:5000/api/v1";
  const envUrls = process.env.BACKEND_API_URLS || "https://newrentnest.vercel.app/api/v1,https://rentnestapi2.vercel.app/api/v1,https://rentnestapi3.vercel.app/api/v1,https://rentnestapi4.vercel.app/api/v1";
  const urls = envUrls.split(",").map(u => u.trim().replace(/\/$/, ""));
  const path = endpoint.startsWith("/") ? endpoint : "/" + endpoint;

  let lastError: any = null;

  for (const baseUrl of urls) {
    const url = baseUrl + path;
    try {
      // const controller = new AbortController();
      // const id = setTimeout(() => controller.abort(), 15000); // 15s timeout to allow cold starts and external API calls like Stripe

      const response = await fetch(url, {
        ...init,
       // signal: init?.signal || controller.signal,
      });
      // clearTimeout(id);

      return response;
    } catch (error) {
      console.warn("[apiFetch] Failed fetching from " + baseUrl + ": " + (error instanceof Error ? error.message : "Timeout/Unknown"));
      lastError = error;
    }
  }

  throw lastError || new Error("All backend API URLs failed to respond.");
}

