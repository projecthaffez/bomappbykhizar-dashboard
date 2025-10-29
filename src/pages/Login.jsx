import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Load Facebook SDK dynamically if not already loaded
    if (!window.FB) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1785537692168610", // ⚠️ Replace with your Facebook App ID
          cookie: true,
          xfbml: true,
          version: "v18.0",
        });
      };

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      alert("Facebook SDK not loaded yet. Please wait a moment and try again.");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.status === "connected") {
          console.log("✅ Logged in:", response);
          navigate("/dashboard"); // Redirect to dashboard after login
        } else {
          alert("Facebook login failed or cancelled.");
        }
      },
      { scope: "public_profile,email,pages_messaging,pages_show_list" }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-4">
          Login with Facebook
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Click below to connect your account securely
        </p>

        <button
          onClick={handleFacebookLogin}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300"
        >
          🔵 Continue with Facebook
        </button>
      </div>
    </div>
  );
}
