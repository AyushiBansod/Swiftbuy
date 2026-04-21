import { useState, useEffect } from "react";
import Checkout from "./checkout"; // Import the Checkout component

function CheckoutLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching resources, API calls)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen bg-black">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p style={{ color: "white", marginTop: "20px", fontSize: "18px" }}>
            Loading Checkout...
          </p>
        </div>
      ) : (
        <Checkout />
      )}
    </div>
  );
}

export default CheckoutLoader;
