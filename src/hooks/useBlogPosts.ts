import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  category: 'general' | 'league-of-legends';
  slug: string;
}

const STORAGE_KEY = 'portfolio_blog_posts';

// Default sample posts
const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: "Getting Started with React and TypeScript",
    excerpt: "A comprehensive guide to setting up a React project with TypeScript and best practices for type safety.",
    content: "Welcome to my guide on React and TypeScript!\n\n## Why TypeScript?\n\nTypeScript adds static typing to JavaScript, which helps catch errors during development and provides better IDE support.\n\n## Setting Up\n\nTo create a new React project with TypeScript, use:\n\nnpx create-react-app my-app --template typescript\n\nThis will set up everything you need to get started with React and TypeScript.",
    date: "2024-01-15",
    tags: ["React", "TypeScript", "Frontend"],
    category: "general",
    slug: "getting-started-with-react-and-typescript"
  },
  {
    id: '2',
    title: "Building Scalable Web Applications",
    excerpt: "Exploring architectural patterns and design principles for creating maintainable and scalable web applications.",
    content: "Building scalable web applications requires careful planning and the right architectural decisions.\n\n## Key Principles\n\n- Separation of concerns\n- Modular design\n- Performance optimization\n- Testing strategy\n\n## Architecture Patterns\n\nSome popular patterns include MVC, MVP, and component-based architectures.",
    date: "2024-01-10",
    tags: ["Architecture", "Web Development", "Best Practices"],
    category: "general",
    slug: "building-scalable-web-applications"
  },
  {
    id: '3',
    title: "My Journey in Software Engineering",
    excerpt: "Reflecting on my experiences, challenges, and lessons learned throughout my software engineering career.",
    content: "Software engineering has been an incredible journey of continuous learning and growth.\n\n## Early Days\n\nWhen I first started coding, everything seemed overwhelming. But with persistence and practice, concepts that once seemed impossible became second nature.\n\n## Key Lessons\n\nThe most important lesson I've learned is that being a software engineer is about much more than just writing code. It's about problem-solving, communication, and continuous learning.",
    date: "2024-01-05",
    tags: ["Career", "Personal", "Learning"],
    category: "general",
    slug: "my-journey-in-software-engineering"
  },
  {
    id: '4',
    title: "From Iron to Diamond: My Ranked Journey",
    excerpt: "The struggles, victories, and lessons learned during my climb from the depths of Iron to Diamond rank.",
    content: "My journey from Iron to Diamond was filled with ups and downs, but it taught me valuable lessons about improvement and perseverance.\n\n## The Iron Days\n\nStarting in Iron was humbling. Every game felt like a struggle, and I often questioned whether I'd ever improve.\n\n## Finding My Role\n\nThe breakthrough came when I found my main role as ADC and started focusing on fundamentals rather than flashy plays.\n\n## The Grind\n\nClimbing through each rank required different skills and mental approaches. What got me out of Bronze wouldn't work in Gold.\n\n### Key Milestones\n\n- **Iron to Bronze**: Learning basic mechanics\n- **Bronze to Silver**: Understanding objectives\n- **Silver to Gold**: Improving map awareness\n- **Gold to Platinum**: Mastering team fights\n- **Platinum to Diamond**: Mental game and consistency",
    date: "2024-01-20",
    tags: ["Ranked", "Improvement", "Personal Journey"],
    category: "league-of-legends",
    slug: "from-iron-to-diamond-my-ranked-journey"
  }
];

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        // Check if the saved posts have old HTML format and reset if needed
        const hasOldFormat = parsedPosts.some((post: BlogPost) => 
          post.content.includes('<p>') || post.content.includes('<h2>')
        );
        
        if (hasOldFormat) {
          console.log('Detected old HTML format, resetting to new format...');
          setPosts(defaultPosts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        } else {
          setPosts(parsedPosts);
        }
      } catch (error) {
        console.error('Error parsing saved posts, resetting...');
        setPosts(defaultPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }
    setLoading(false);
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    const sortedPosts = newPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(sortedPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedPosts));
  };

  const addPost = (post: BlogPost) => {
    const newPosts = [post, ...posts];
    savePosts(newPosts);
  };

  const updatePost = (updatedPost: BlogPost) => {
    const newPosts = posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    savePosts(newPosts);
  };

  const deletePost = (postId: string) => {
    const newPosts = posts.filter(post => post.id !== postId);
    savePosts(newPosts);
  };

  const getPostBySlug = (slug: string) => {
    console.log('getPostBySlug - searching for:', slug);
    console.log('getPostBySlug - available posts:', posts.map(p => ({ id: p.id, slug: p.slug, title: p.title })));
    const found = posts.find(post => post.slug === slug);
    console.log('getPostBySlug - found:', found);
    return found;
  };

  const getPostsByCategory = (category: 'general' | 'league-of-legends') => {
    return posts.filter(post => post.category === category);
  };

  const resetPosts = () => {
    setPosts(defaultPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  };

  const clearAllPosts = () => {
    setPosts([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    getPostBySlug,
    getPostsByCategory,
    resetPosts,
    clearAllPosts
  };
};