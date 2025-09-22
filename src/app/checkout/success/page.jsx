"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { CheckCircle, ArrowRight, CreditCard } from "lucide-react";
import Button from "@/utils/Button";
import ClientSuspense from "@/components/ClientSuspense";

function SuccessParamsReader({ onSessionId }) {
	const searchParams = useSearchParams();

	useEffect(() => {
		const session = searchParams.get("session_id");
		onSessionId(session || "");
	}, [searchParams, onSessionId]);

	return null;
}

export default function CheckoutSuccessPage() {
	const router = useRouter();
	const [sessionId, setSessionId] = useState("");

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<ClientSuspense>
				<SuccessParamsReader onSessionId={setSessionId} />
			</ClientSuspense>
			<div className="max-w-2xl mx-auto px-4 py-16">
				<div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
					{/* Success Icon */}
					<div className="mb-6">
						<CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
					</div>

					{/* Success Message */}
					<h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
					<p className="text-gray-300 mb-6">
						Thank you for your purchase! Your subscription is now active and you can start creating amazing ads.
					</p>

					{/* Session Info */}
					{sessionId && (
						<div className="bg-gray-700 p-4 rounded-lg mb-6">
							<p className="text-sm text-gray-400">Session ID: {sessionId}</p>
						</div>
					)}

					{/* Next Steps */}
					<div className="space-y-4 mb-8">
						<h3 className="text-lg font-semibold">What's next?</h3>
						<div className="space-y-2 text-left">
							<div className="flex items-center gap-3">
								<CheckCircle className="h-4 w-4 text-green-400" />
								<span className="text-sm text-gray-300">Your account has been upgraded</span>
							</div>
							<div className="flex items-center gap-3">
								<CheckCircle className="h-4 w-4 text-green-400" />
								<span className="text-sm text-gray-300">Access to all premium features</span>
							</div>
							<div className="flex items-center gap-3">
								<CheckCircle className="h-4 w-4 text-green-400" />
								<span className="text-sm text-gray-300">Start creating your first ad</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4">
						<Button
							variant="primary"
							onClick={() => router.push("/dashboard")}
							className="flex-1 flex items-center justify-center"
						>
							<CreditCard className="h-4 w-4 mr-2" />
							Go to Dashboard
						</Button>
						<Button
							variant="outline"
							onClick={() => router.push("/generate")}
							className="flex-1 flex items-center justify-center"
						>
							<ArrowRight className="h-4 w-4 mr-2" />
							Create Your First Ad
						</Button>
					</div>

					{/* Support */}
					<p className="text-xs text-gray-500 mt-6">
						Need help? Contact our support team or check your email for confirmation details.
					</p>
				</div>
			</div>
		</div>
	);
}
