/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: "21fbd9b6fa23101619f3",
    NEXT_PUBLIC_API_SECRET:
      "c1f27114e16263d842f5b127fe310c358533e2c2107d65dac9e2b4a85e0caf5a",
    NEXT_PUBLIC_CYBERCONNECT_API_KEY: "KRDa1CAm3WnzbnDivnrp3cAcWJxohlWA",
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://api.cyberconnect.dev/testnet/",
    NEXT_PUBLIC_CHAIN_ID: 97,
    FACEBOOK_CLIENT_ID: "645742077317889",
    FACEBOOK_CLIENT_SECRET: "39d755036c2f961e7334e4f740f3a59f",
    NEXTAUTH_URL: "http://localhost:3000/",
    GITHUB_ID: "Iv1.feb9dbda97e5d96d",
    GITHUB_SECRET: "320ebd943ae81bd9aa644a9ca4987e50218be272",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4eWJma2hoaHZiaHVnaWdmcmtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxMTU4OTAsImV4cCI6MTk5MzY5MTg5MH0.ooyFKWQT981vk3kghjTdMI2bvdqTUARGtO6Fr7BpXNc",
    NEXT_PUBLIC_SUPABASE_URL: "https://ixybfkhhhvbhugigfrkg.supabase.co",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
}

module.exports = nextConfig
