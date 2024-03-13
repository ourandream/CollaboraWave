export const useAppStore = defineStore("userStore", {
  state: () => ({
    token: null as null | string,
    userName: "",
    tasks: [
      {
        title: "create own types in Nuxt Typescript?",
        start: new Date("2024-03-08"),
        end: new Date("2024-03-15"),
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
        start: new Date("2024-03-08"),
        end: new Date("2024-03-15"),
        description:
          "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
        progress: 70,
        people: ["10051"],
        done: false,
      },
    ] as TaskInfo[],
    people: ["Andy", "Bob", "John"],
    toBeAddPeople: ["Joa", "Job", "Joc", "Daly"],
    peopleAuthorMap: {
      Andy: "/imgs/avatar2.jpg",
    },
    documentInfos: {
      project1: [
        {
          type: "md",
          name: "概要设计",
          key: "1",
          info: { history: [], finalData: "## abc" },
        },
      ],
      project2: [
        {
          type: "spreadsheet",
          name: "表格1",
          info: { history: [], finalData: {} },
          key: "2",
        },
      ],
    } as DocumentInfos,
    currentKey: 3,
  }),
  getters: {
    primaKey(states) {
      const result = states.currentKey.toString();
      states.currentKey++;
      return result;
    },
  },
  actions: {
    getAuthor(name: string) {
      if (name in this.peopleAuthorMap) {
        return Reflect.get(this.peopleAuthorMap, name) as string;
      } else {
        return "/imgs/avatar.jpg";
      }
    },
    isAuth() {
      if (this.token === null) {
        return false;
      }
      return true;
    },
  },
  persist: true,
});
