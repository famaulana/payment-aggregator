/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Ensure the compiler plays nice with Emotion
  transpilePackages: [
    "yup",
    "@hookform/resolvers",
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
  ],
};

export default nextConfig;
