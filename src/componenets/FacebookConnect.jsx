"use client";

import { useState, useEffect } from "react";
import { Facebook, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { facebookService } from "@/services/facebookService";
import Button from "@/utils/Button";

const FacebookConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [accounts, setAccounts] = useState(null);

  // Check connection status on component mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Check if we're returning from a successful Facebook connection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      // Refresh connection status after successful connection
      setTimeout(() => {
        checkConnectionStatus();
      }, 1000);
    }
  }, []);

  const checkConnectionStatus = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { data, error } = await facebookService.checkConnectionStatus();
      
      if (error) {
        setError(error.message);
        setIsConnected(false);
      } else {
        setIsConnected(data.isConnected);
        setAccounts(data.accounts);
      }
    } catch (err) {
      setError("Failed to check Facebook connection status");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError("");
      
      const { data, error } = await facebookService.getConnectURL();
      
      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to Facebook OAuth URL
      window.location.href = data.data.auth_url;
    } catch (err) {
      setError("Failed to initiate Facebook connection");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    // For now, just update local state
    // In a real implementation, you'd call a disconnect API
    setIsConnected(false);
    setAccounts(null);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-300">Checking Facebook connection...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-1">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <Facebook className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">Facebook Integration</h3>
            <p className="text-sm text-gray-400">
              {isConnected ? "Connected to Facebook" : "Connect your Facebook account"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center ml-4 flex-shrink-0">
          {isConnected ? (
            <div className="flex items-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Not Connected</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {isConnected && accounts ? (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Connected Accounts</h4>
            <div className="space-y-2">
              {accounts.ad_accounts?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400">Ad Accounts:</p>
                  <p className="text-sm text-white">
                    {accounts.ad_accounts.length} account{accounts.ad_accounts.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              )}
              {accounts.pages?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400">Pages:</p>
                  <p className="text-sm text-white">
                    {accounts.pages.length} page{accounts.pages.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={checkConnectionStatus}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 py-2 px-4 rounded-lg transition-colors"
            >
              Refresh Status
            </button>
            <button
              onClick={handleDisconnect}
              className="flex-1 border border-red-500 text-red-400 hover:bg-red-900/20 py-2 px-4 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Why connect Facebook?</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Create and manage Facebook ads directly</li>
              <li>• Access your ad accounts and pages</li>
              <li>• Track ad performance and insights</li>
              <li>• Automate ad creation workflows</li>
            </ul>
          </div>
          
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <Facebook className="h-4 w-4 mr-2" />
                Connect Facebook
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FacebookConnect;
