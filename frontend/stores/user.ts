export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null as null | string,
    tasks: [
      {
        title: "create own types in Nuxt Typescript?",
        description:
          "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
        progress: 70,
        people: ["10051"],
        done: false,
        subTask: [
          {
            title: "create own types in Nuxt Typescript?",
            description:
              "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
            progress: 70,
            people: ["10051"],
            done: false,
          },
          {
            title: "create own types in Nuxt Typescript?",
            description:
              "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
            progress: 70,
            people: ["10051"],
            done: false,
          },
        ],
      },
      {
        title: "create own types in Nuxt Typescript?",
        description:
          "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
        progress: 70,
        people: ["10051"],
        done: false,
      },
    ] as TaskInfo[],
    people: ["Andy", "Bob", "John"],
    toBeAddPeople: ["Joa", "Job", "Joc", "Daly"],
  }),
  actions: {
    isAuth() {
      if (this.token === null) {
        return false;
      }
      return true;
    },
  },
});
