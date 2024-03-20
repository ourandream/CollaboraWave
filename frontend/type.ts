declare global {
  interface ProjectInfo {
    title: string;
    start: Date;
    end: Date;
    description: string;
    progress: number;
    done: boolean;
    people: string[];
    tags?: { color: string; content: string }[];
    subProject?: ProjectInfo[];
  }

  interface MdFileInfo {
    startData: string;
    finalData: string;
    /**
     *  Edit history
     */
    history: { author: string; patch: string; date: string }[];
  }

  interface SpreetSheetFileInfo {
    startData: Record<string, any>;
    finalData: Record<string, any>;
    history: { author: string; date: string; data: Record<string, any> }[];
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
