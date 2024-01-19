import { useEffect, useState } from "react";

export const useLocation = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, []);
  return state;
};
