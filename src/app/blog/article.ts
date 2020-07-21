export interface Article {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
  image: string;
}

export type Articles = Article[];
