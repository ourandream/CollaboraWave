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
    finalData: string;
    /**
     *  Edit history
     */
    history: { author: string; patch: string; date: string }[];
  }

  interface SpreetSheetFileInfo {
    finalData: Record<string, any>;
    history: { author: string; date: string; data: string }[];
  }

  type DocumentInfos = Record<
    string,
    (
      | { name: string; key: string; type: "md"; info: MdFileInfo }
      | {
          name: string;
          key: string;
          type: "spreadsheet";
          info: SpreetSheetFileInfo;
        }
    )[]
  >;
}
export {};
