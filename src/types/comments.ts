export interface postCommentType{
  content:string;
  cardId:number;
  columnId:number;
  dashboardId:number;
}

export interface getCommentType{
  size:number;
  cardId:number;
}

export interface putCommentType{
  commentId:number;
  content:string;
}