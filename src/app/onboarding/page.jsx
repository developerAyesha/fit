"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OnboardingWizard from "@/componenets/onboarding/onboardingWizard";
import { useAuth } from "@/context/authContext";
import TokenManager from "@/utils/tokenManager";
import { authService } from "@/services/authService";
import { toast } from "@/lib/toast";

export default function Dashboard() {
  const { user, loading, logout, fetchUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  console.log(user);

  useEffect(() => {
    // Handle Google OAuth callback when user returns from Google with access token
    // URL format: http://localhost:3000/onboarding?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    const handleGoogleOAuthCallback = async () => {
      const accessToken = searchParams.get('accessToken');
      
      if (accessToken) {
      
        try {
          // Store the token
          const tokenStored = TokenManager.setAccessToken(accessToken);
          if (!tokenStored) {
          
            toast.error("Failed to store authentication token");
            return;
          }

         
          
          // Verify the token with backend and get user profile
          await fetchUser();
          
          // Check if user is now authenticated
          if (TokenManager.hasAccessToken()) {
            
            toast.success("Successfully logged in with Google!");
            
            // Clean up URL parameters to remove the token from the URL
            const url = new URL(window.location);
            url.searchParams.delete('accessToken');
            window.history.replaceState({}, document.title, url.pathname + url.search);
          } else {
            console.error(" Token verification failed - no token found after fetchUser");
            toast.error("Authentication failed. Please try logging in again.");
            router.push("/auth");
          }
        } catch (error) {
          console.error(" Error during Google OAuth callback:", error);
          toast.error("Authentication error. Please try again.");
          TokenManager.removeAccessToken();
          router.push("/auth");
        }
      }
    };

    // Only run this effect if we have search params
    if (searchParams.toString()) {
      handleGoogleOAuthCallback();
    }
  }, [searchParams, router, fetchUser]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div>
     <OnboardingWizard/>
    </div>
  );
}
