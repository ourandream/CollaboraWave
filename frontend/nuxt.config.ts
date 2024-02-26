// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  ui: { icons: ["material-symbols"] },
  colorMode: {
    preference: "light",
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tagName) => {
            return (
              tagName === "vue-advanced-chat" || tagName === "emoji-picker"
            );
          },
        },
      },
    },
  },
  build: {
    transpile: ["echarts", "zrender", "tslib"],
  },
});
