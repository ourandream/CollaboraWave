export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null as null | string,
  }),
  actions: {
    isAuth() {
      if (this.token === null) {
        return false;
      }
      return true;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
