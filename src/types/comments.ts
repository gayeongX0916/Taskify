export interface postCommentType{
  content:string;
  cardId:number;
  columnId:number;
  dashboardId:number;
}

export interface getCommentType{
  id:number;
  content:string;
  createdAt:string;
  updatedAt:string;
  cardId:number;
  author:{
    profileImageUrl:string;
    nickname:string;
    id:number;
  }
}

export interface putCommentType{
  commentId:number;
  content:string;
}