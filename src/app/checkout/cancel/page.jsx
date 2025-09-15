"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Button from "@/utils/Button";

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
          {/* Cancel Icon */}
          <div className="mb-6">
            <XCircle className="h-16 w-16 text-red-400 mx-auto" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-gray-300 mb-6">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          {/* Reasons */}
          <div className="bg-gray-700 p-4 rounded-lg mb-6 text-left">
            <h3 className="text-lg font-semibold mb-3">Common reasons for cancellation:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• You closed the payment window</li>
              <li>• Payment was declined by your bank</li>
              <li>• You decided to choose a different plan</li>
              <li>• Technical issues during payment</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              onClick={() => router.push("/")}
              className="flex-1 flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Support */}
          <p className="text-xs text-gray-500 mt-6">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
