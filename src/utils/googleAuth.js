// Google OAuth utility functions

export const googleAuth = {
  // Initiate Google OAuth login
  initiateLogin: () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1";
    const redirectUrl = `${window.location.origin}/onboarding`;
    
    // Construct Google OAuth URL with redirect
    const googleAuthUrl = `${baseUrl}/auth/google?redirect_uri=${encodeURIComponent(redirectUrl)}`;
    
    console.log("🔍 Redirecting to Google OAuth:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  },

  // Check if current URL contains Google OAuth callback
  isOAuthCallback: () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('accessToken');
  },

  // Extract access token from URL
  getAccessTokenFromUrl: () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('accessToken');
  },

  // Clean up URL after successful authentication
  cleanupUrl: () => {
    const url = new URL(window.location);
    url.searchParams.delete('accessToken');
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }
};

export default googleAuth;
