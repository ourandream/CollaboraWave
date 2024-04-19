export const useTimeStore = defineStore("time", {
  state() {
    return {
      projectStartTimeMap: new Map<string, Date>(),
      projectEndTimeMap: new Map<string, Date>(),
    };
  },
  actions: {
    getProjectTime(project: string) {
      return {
        start: this.projectEndTimeMap.get(project),
        end: this.projectEndTimeMap.get(project),
      };
    },
  },
});
