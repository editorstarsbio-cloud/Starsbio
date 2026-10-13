export interface BlogPostSection {
  title: string;
  content: string; // Markdown or plain text paragraph
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  celebritySlug: string;
  celebrityName: string;
  publishedAt: string; // YYYY-MM-DD
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  seoTitle?: string;
  metaDescription?: string;
  quickFacts: {
    born: string;
    age: number;
    birthplace: string;
    profession: string;
    netWorth: string;
    spouse: string;
    children: string;
    famousFor: string;
  };
  sections: BlogPostSection[];
}
