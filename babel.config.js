require('dotenv').config({ debug: process.env.DEBUG })

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['inline-dotenv'],
  };
};
