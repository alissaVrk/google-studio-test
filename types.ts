export interface Message {
  role: 'user' | 'model';
  content: string;
  isTyping?: boolean;
}

export interface CatProfile {
  name: string;
  tagline: string;
  age: number;
  breed: string;
  likes: string[];
  dislikes: string[];
  avatarUrl: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  caption: string;
}
