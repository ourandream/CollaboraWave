export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  if (to.path !== "/login") {
    if (!useUserStore().token) {
      navigateTo("/login");
    }
  }
});
