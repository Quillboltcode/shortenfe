import { useState,useEffect } from "react";
import QRCode from "react-qr-code";
import { FaRegCopy } from "react-icons/fa";
import { api } from "../utils/api.js";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [healthStatus, setHealthStatus] = useState("Checking connection..."); // Initial state while checking

  // Function to perform the health check
  const performHealthCheck = async () => {
    try {
      const response = await api.checkHealth(); // Call the health check API
      console.log("Health check response:", response);

      // Update the state based on the response
      if (response == "API Gateway is healthy") {
        setHealthStatus("Connected");
      } else {
        setHealthStatus("No connection");
      }
    } catch (error) {
      console.error("Health check failed:", error);
      setHealthStatus("No connection"); // Update state on failure
    }
  };

    // Perform health check on component mount
    useEffect(() => {
      performHealthCheck();
    }, []); // Empty dependency array ensures this runs only once on mount

  // const handleShorten = () => {
  //   if (originalUrl.trim() === "") return;
  //   const baseShortUrl = "https://sho.rt/";
  //   const alias = customAlias.trim() ? customAlias : btoa(originalUrl).slice(0, 6);
  //   const newShortUrl = baseShortUrl + alias;
  //   setShortUrl(newShortUrl);
  //   setHistory(prev => [...prev, { original: originalUrl, shortened: newShortUrl }]);
  //   setOriginalUrl("");
  //   setCustomAlias("");
  //   setShowQR(false);
  // };



  const handleShorten = async () =>{
    if (originalUrl.trim() === "") return;

    try {
      // Prepare the data to send to the backend
      const requestData = {
        long_url: originalUrl
      };

      // Call the API to shorten the URL
      const response = await api.shortenUrl(requestData);
      console.log(response);
      // Update state with the shortened URL
      const newShortUrl = response.shortened_url; // Assuming the backend returns this field
      setShortUrl(newShortUrl);

      // Add the shortened URL to the history
      setHistory((prev) => [
        ...prev,
        { original: originalUrl, shortened: newShortUrl },
      ]);

      // Clear input fields
      setOriginalUrl("");
      setCustomAlias("");
      setShowQR(false);
    } catch (error) {
      console.error("Failed to shorten URL:", error);
      alert("An error occurred while shortening the URL. Please try again.");
    }
  };
  

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6"
      style={{
        backgroundImage: "url('https://i.pinimg.com/236x/31/8a/82/318a820a19ea2fa8eb9b5a780dce3800.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">API Connection Status</h1>
        <p className="mt-4 text-lg">
          {healthStatus === "Connected" ? (
            <span className="text-green-600">✅ Connected</span>
          ) : healthStatus === "No connection" ? (
            <span className="text-red-600">❌ No connection</span>
          ) : (
            <span className="text-gray-500">⏳ Checking connection...</span>
          )}
        </p>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-3 gap-6">

        {/* Box 1: Guide */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-blue-800 text-sm">
          <h2 className="text-xl font-bold mb-4">User Guide</h2>
          <p>- Enter your long URL in the middle box.</p>
          <p>- You can customize the alias as you like.</p>
          <p>- If you leave it empty, the system will auto-generate one.</p>
          <p>- After shortening, the link will appear on the right.</p>
        </div>

        {/* Box 2: Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Shorten a Long URL</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleShorten();
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter your original URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Customize your alias (optional)</label>
              <input
                type="text"
                placeholder="Enter alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Shorten URL
            </button>
          </form>

          {/* Shortened URL and QR Section */}
          {shortUrl && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center flex flex-col items-center">
              <p className="text-sm font-medium mb-2">Your shortened URL:</p>
              <div className="flex items-center gap-2 mb-4">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium break-words"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="text-gray-600 hover:text-gray-800 p-1 rounded-lg"
                  title="Copy to clipboard"
                >
                  <FaRegCopy size={20} />
                </button>
              </div>

              {/* Button to toggle QR code */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="mb-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
              >
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </button>

              {/* QR Code */}
              {showQR && (
                <div className="mt-2 flex justify-center">
                  <QRCode value={shortUrl} size={128} />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Box 3: History */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-gray-800 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Shortened URL History</h2>
          {history.length === 0 ? (
            <p className="text-gray-500">No URLs have been shortened yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-700 break-words mb-1">
                    <strong>Original:</strong> {item.original}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-blue-600 break-words">
                      <strong>Shortened:</strong>{" "}
                      <a
                        href={item.shortened}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.shortened}
                      </a>
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.shortened);
                        alert("Copied to clipboard!");
                      }}
                      className="text-gray-600 hover:text-gray-800 p-1 rounded-lg"
                      title="Copy to clipboard"
                    >
                      <FaRegCopy size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
