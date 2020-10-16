module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".ios.js", ".android.js", ".json", "ts", "tsx"],
          alias: {
            "assets": "./assets",
            "components": "./src/components",
            "utils": "./src/services",
            "store": "./store",
            "types": "./src/types",
            "constants": "./src/constants",
            "config": "./src/config",
            "screens": "./src/screens"
          }
        }
      ]
    ]
  };
};
