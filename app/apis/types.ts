export interface IConfirmInteraction {
  postId: string;
  actionType: 'like' | 'comment' | 'share';
  action: boolean;
}
