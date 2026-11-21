/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.ts.net", "100.69.14.72"],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
