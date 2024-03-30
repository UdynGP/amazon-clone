// ExternalRedirect.js
import { useEffect } from "react";

const ExternalRedirect = () => {
  useEffect(() => {
    // Redirect to the external URL
    window.location.href = "https://www.primevideo.com/";
  }, []);

  return null;
};

export default ExternalRedirect;
