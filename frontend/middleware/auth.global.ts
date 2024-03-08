export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  if (to.path !== "/login") {
    if (!useAppStore().token) {
      navigateTo("/login");
    }
  }
});
