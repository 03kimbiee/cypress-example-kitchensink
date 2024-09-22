module.exports = {
  e2e: {
    chromeWebSecurity: false, // Desactiva la política de seguridad web de Chrome
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
};
