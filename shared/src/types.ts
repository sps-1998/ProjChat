export interface Board {
  id: string;
  title: string;
}
export interface Card {
  id: string;
  boardId: string;
  content: string;
}
export interface ChatMessage {
  id: string;
  boardId: string;
  userId: string;
  text: string;
  timestamp: string;
}
