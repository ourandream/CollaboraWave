export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return;
  if (to.path !== "/login") {
    console.log(useUserStore().token);
  }
});
