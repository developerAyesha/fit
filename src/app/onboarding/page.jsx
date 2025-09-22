"use client";
import OnboardingWizard from "@/componenets/onboarding/onboardingWizard";
import { useAuth } from "@/context/authContext";
export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  console.log(user)
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div>
     <OnboardingWizard/>
    </div>
  );
}
