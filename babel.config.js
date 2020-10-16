module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            components: "./src/components",
            services: "./src/services",
            store: "./store",
            types: "./src/types",
            constants: "./src/constants"
          }
        }
      ]
    ]
  };
};
