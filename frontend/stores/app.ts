export const useAppStore = defineStore("userStore", {
  state: () => ({
    token: null as null | string,
    userName: "Andy",
    projects: [
      {
        title: "项目一",
        start: new Date("2024-03-08"),
        end: new Date("2024-03-15"),
        description: "This is description.",
        progress: 70,
        people: ["Andy", "Joa"],
        done: false,
        subProject: [
          {
            title: "子项目一",
            description: "This is description.",
            progress: 70,
            people: ["10051"],
            done: false,
          },
          {
            title: "子项目二",
            description: "This is description.",
            progress: 70,

            people: ["Andy", "Joa"],
            done: false,
          },
        ],
      },
      {
        title: "项目二",
        start: new Date("2024-03-08"),
        end: new Date("2024-03-15"),
        description: "This is description.",
        progress: 70,
        people: ["Andy", "Joa"],
        done: false,
      },
    ] as ProjectInfo[],
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
          info: { history: [], finalData: "## abc", startData: "## abc" },
        },
      ],
      project2: [
        {
          type: "spreadsheet",
          name: "表格1",
          info: { history: [], finalData: {}, startData: {} },
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
