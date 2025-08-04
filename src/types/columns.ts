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
  file: File;
}

export interface getColumnListType {
  id: number;
  title: string;
  dashboardId: number;
}
