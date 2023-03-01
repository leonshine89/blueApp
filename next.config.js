/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_KEY: "4f72b98eb79b86cb473a",
    NEXT_PUBLIC_API_SECRET:
      "007afb77e3e1e9f3e416e107d07255e11abd42781b71cd1c28c002620decb15b",
    NEXT_PUBLIC_CYBERCONNECT_API_KEY: "KRDa1CAm3WnzbnDivnrp3cAcWJxohlWA",
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: "https://api.cyberconnect.dev/testnet/",
    NEXT_PUBLIC_CHAIN_ID: 97,
    FACEBOOK_CLIENT_ID: "645742077317889",
    FACEBOOK_CLIENT_SECRET: "39d755036c2f961e7334e4f740f3a59f",
    NEXTAUTH_URL: "http://localhost:3000/",
    GITHUB_ID: "Iv1.feb9dbda97e5d96d",
    GITHUB_SECRET: "320ebd943ae81bd9aa644a9ca4987e50218be272",
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
}

module.exports = nextConfig
