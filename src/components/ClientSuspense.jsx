"use client";

import React, { Suspense } from "react";

export default function ClientSuspense({ children, fallback }) {
	return (
		<Suspense
			fallback={
				fallback ?? (
					<div className="min-h-[120px] flex items-center justify-center">
						<div className="text-sm text-gray-400">Loading...</div>
					</div>
				)
			}
		>
			{children}
		</Suspense>
	);
}

