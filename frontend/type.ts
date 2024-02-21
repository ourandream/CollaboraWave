declare global {
  interface TaskInfo {
    title: string;
    description: string;
    progress: number;
    done: boolean;
    people: string[];
    tags?: { color: string; content: string }[];
    subTask?: TaskInfo[];
  }
}
export {};
