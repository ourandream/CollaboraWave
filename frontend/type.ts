declare global {
  interface TaskInfo {
    title: string;
    start: Date;
    end: Date;
    description: string;
    progress: number;
    done: boolean;
    people: string[];
    tags?: { color: string; content: string }[];
    subTask?: TaskInfo[];
  }

  interface MdFileInfo {
    finalText: string;
    /**
     *  Edit history
     */
    history: { author: string; patch: string; date: string };
  }
}
export {};
