export interface BaseCardType {
  assigneeUserId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface postCardType extends BaseCardType {
  dashboardId: number;
}

export interface getCardListType {
  size: number;
  columnId: number;
}

export interface putCardType extends BaseCardType {
  cardId: number;
}
