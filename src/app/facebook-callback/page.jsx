"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { facebookService } from "@/services/facebookService";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function FacebookCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing"); // processing, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const success = searchParams.get("success");
        const error = searchParams.get("error");
        const message = searchParams.get("message");

        // Debug: Log all parameters
        console.log("Callback parameters:", {
          success,
          error,
          message,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (error === "true") {
          setStatus("error");
          setMessage(decodeURIComponent(message) || "Facebook authorization failed");
          return;
        }

        if (success === "true") {
          setStatus("success");
          setMessage("Facebook account connected successfully!");
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(`Invalid callback parameters. Received: success=${success}, error=${error}, message=${message}`);
        }
      } catch (err) {
        setStatus("error");
        setMessage("An unexpected error occurred");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md w-full text-center">
        {status === "processing" && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Connecting to Facebook</h2>
            <p className="text-gray-400">Please wait while we connect your Facebook account...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Success!</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Connection Failed</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
