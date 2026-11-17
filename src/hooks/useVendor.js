import { useEffect, useState } from "react";
import { subscribeToVendor, subscribeToMenu } from "../services/vendors.js";

export function useVendor(vendorId, sortBy = "default") {
  const [vendor, setVendor] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let vendorLoaded = false;
    let menuLoaded = false;

    function checkLoading() {
      if (vendorLoaded && menuLoaded) {
        setLoading(false);
      }
    }

    const unsubscribeVendor = subscribeToVendor(
      vendorId,
      (data) => {
        setVendor(data);
        vendorLoaded = true;
        checkLoading();
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    const unsubscribeMenu = subscribeToMenu(
      vendorId,
      (items) => {
        setMenu(items);
        menuLoaded = true;
        checkLoading();
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      sortBy,
    );

    return () => {
      unsubscribeVendor();
      unsubscribeMenu();
    };
  }, [vendorId, sortBy]);

  return { vendor, menu, loading, error };
}
