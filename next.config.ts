import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
<<<<<<< HEAD
=======
  typescript: {
    ignoreBuildErrors:true,
  },
  cacheComponents:true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        
      }
    ]
  }
>>>>>>> api-routes
};

export default nextConfig;
