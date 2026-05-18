(function () {
  const token = localStorage.getItem("access_token");
  const companyId = localStorage.getItem("company_id");

  function logoutAndRedirect() {
    localStorage.clear();
    window.location.replace("/");
  }

  if (!token || !companyId) {
    logoutAndRedirect();
    return;
  }

  // Parse JWT token structure and expiration on the client side
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    // base64 decode the payload
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      throw new Error("Token expired");
    }
    if (payload.company_id !== companyId) {
      throw new Error("Company ID mismatch");
    }
  } catch (e) {
    console.warn("Local auth validation failed:", e.message);
    logoutAndRedirect();
    return;
  }

  // Global fetch interceptor to catch any 401 responses from the API
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await originalFetch(...args);
    if (response.status === 401) {
      console.warn("Session expired or unauthorized by server. Redirecting to login...");
      logoutAndRedirect();
    }
    return response;
  };
})();
