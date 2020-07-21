const withPlugins = require("next-compose-plugins");

const withImage = require("next-images");

const nextConfig = {
  webpack: (config) => {
    config.node = {
      fs: "empty",
    };
    return config;
  },
};

module.exports = withPlugins([[withImage]], nextConfig);
