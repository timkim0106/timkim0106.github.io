import { useState, useEffect } from 'react';
import { BlogPost } from '../types/blog';

const STORAGE_KEY = 'portfolio_blog_posts';

// Default sample posts (empty - ready for your content)
const defaultPosts: BlogPost[] = [];

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