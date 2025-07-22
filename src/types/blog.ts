export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  category: 'general' | 'league-of-legends';
  slug: string;
}