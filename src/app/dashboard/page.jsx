"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
// import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Zap, Library, Settings, Target } from "lucide-react";
import Button from "@/utils/Button";

export default function Dashboard() {
  const { user, loading } = useAuth();
  //   const { totalAdsGenerated, isLoading: statsLoading } = useDashboardStats();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!user) return null;

  const quickActions = [
    {
      title: "Generate New Ad",
      description: "Create a new high-converting fitness ad",
      icon: Zap,
      path: "/generate",
      color: "bg-blue-500",
    },
    {
      title: "View Library",
      description: "Browse your past ad campaigns",
      icon: Library,
      path: "/library",
      color: "bg-green-500",
    },
    {
      title: "Brand Setup",
      description: "Update your brand settings",
      icon: Settings,
      path: "/brand-setup",
      color: "bg-purple-500",
    },
  ];

  const stats = [
    {
      label: "Total Ads Generated",
      //   value: statsLoading ? "..." : totalAdsGenerated.toString(),
      value: 3,
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          {user?.name && (
            <h1 className="text-3xl font-bold tracking-wide mb-2">
              Welcome, {user.name}
            </h1>
          )}
          <h2 className="text-2xl font-semibold mb-1">Dashboard</h2>
          <p className="text-gray-400">
            Here's your fitness ad performance overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">
                  {stat.label}
                </span>
                <stat.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="bg-gray-900 p-6 rounded-lg hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => router.push(action.path)}
                >
                  Get Started
                </Button>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
