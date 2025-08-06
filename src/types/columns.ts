export interface postColumnType {
  dashboardId: number;
  title: string;
}

export interface putColumnType {
  columnId: number;
  title: string;
}

export interface postCardImgType {
  columnId: number;
  image: File;
}

export interface getColumnListType {
  id: number; // columnId
  title: string;
  dashboardId: number;
}
