"use client";

import { useState,useEffect } from "react";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {

  const { user, loading,logout } = useAuth();
  const router = useRouter();

  // redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth"); // redirect to auth page
    }
  }, [user, loading, router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ad Generator", path: "/dashboard/generate" },
    { name: "Campaign Library", path: "/dashboard/campaignLibrary" },
    { name: "Brand Setup", path: "/dashboard/brand-setup" },
    { name: "Account", path: "/dashboard/account" },
  ];

  

  return (
    <div className="flex h-screen w-full bg-[#232127] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#232127] text-white border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">FA</span>
            </div>
            <span className="font-bold text-lg">FITNESSADS.AI</span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                router.push(item.path);
                setSidebarOpen(false); // Close mobile sidebar on navigation
              }}
              className="w-full text-left px-4 py-4 rounded-md text-sm hover:bg-red-600 transition-colors duration-200 flex items-center"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 md:ml-0">
        {/* Top Header - Fixed */}
        <header className="flex-shrink-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center">
          {/* Left side (hamburger for mobile) */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Optional: Page title or breadcrumbs */}
            <h1 className="text-white text-lg font-semibold hidden sm:block">
              Dashboard
            </h1>
          </div>

          {/* Spacer pushes dropdown to the right */}
          <div className="flex-1" />

          {/* User Dropdown (always top right) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md text-sm text-white hover:bg-gray-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.email}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop for dropdown */}
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-2 z-20">
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          router.push(item.path);
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm  text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </button>
                    ))}
                    <div className="border-t border-gray-700 my-2" />
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-red-400 hover:bg-gray-700"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </header>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          <div className="p-6">
            {/* Demo content */}
            {children }
          </div>
        </main>
      </div>
    </div>
  );
}