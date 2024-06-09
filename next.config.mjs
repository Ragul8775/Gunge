export default {
  experimental: {
    appDir: true,
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["grunge-ecommerce.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // Optionally, you can add pathname: '/a/**' to match specific paths
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};
