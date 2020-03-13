module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/mixins.scss";
          @import "@/scss/animations.scss";
          @import "@/scss/constants.scss";
        `,
      },
    },
  },
};
