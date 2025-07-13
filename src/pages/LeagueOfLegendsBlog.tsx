import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogEditor from '../components/BlogEditor';

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

const LeagueOfLegendsBlog: React.FC = () => {
  const { getPostsByCategory, addPost, updatePost, deletePost } = useBlogPosts();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showAdminControls, setShowAdminControls] = useState(false);
  
  const lolPosts = getPostsByCategory('league-of-legends');

  if (isCreating || editingPost) {
    return (
      <BlogEditor
        post={editingPost || undefined}
        onSave={(post) => {
          const lolPost = { ...post, category: 'league-of-legends' as const };
          if (editingPost) {
            updatePost(lolPost);
          } else {
            addPost(lolPost);
          }
          setIsCreating(false);
          setEditingPost(null);
        }}
        onCancel={() => {
          setIsCreating(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="nes-container with-title">
      <p className="title">League of Legends Blog</p>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p>Welcome to my League of Legends corner! Here I share my thoughts on the game, strategies, and the endless journey of improvement in the Rift.</p>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <Link to="/blog" className="nes-btn" style={{ 
            backgroundColor: '#495057', 
            color: '#ffffff', 
            borderColor: '#ffffff' 
          }}>
            ← Back to All Posts
          </Link>
          <button onClick={() => setIsCreating(true)} className="nes-btn is-success">
            + Add LoL Post
          </button>
          <button 
            onClick={() => setShowAdminControls(!showAdminControls)} 
            className="nes-btn is-warning"
          >
            {showAdminControls ? 'Hide' : 'Show'} Admin Controls
          </button>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          {lolPosts.map((post) => (
            <article key={post.id} className="nes-container" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h2 className="nes-text is-primary" style={{ margin: 0, flex: 1 }}>
                  <Link 
                    to={`/blog/post/${post.slug}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {post.title}
                  </Link>
                </h2>
                
                {showAdminControls && (
                  <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
                    <button 
                      onClick={() => setEditingPost(post)} 
                      className="nes-btn is-warning"
                      style={{ fontSize: '10px', padding: '4px 8px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                          deletePost(post.id);
                        }
                      }} 
                      className="nes-btn is-error"
                      style={{ fontSize: '10px', padding: '4px 8px' }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <span style={{ color: '#6c757d' }}>{post.date}</span>
              </div>
              
              <p>{post.excerpt}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                {post.tags.map((tag, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    backgroundColor: '#dc3545',
                    color: '#ffffff',
                    padding: '2px 6px',
                    border: '2px solid #ffffff',
                    borderRadius: '0',
                    fontFamily: 'monospace',
                    fontSize: '11px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  console.log('LoL Blog - Navigating to:', `/blog/post/${post.slug}`);
                  window.location.href = `/blog/post/${post.slug}`;
                }}
                className="nes-btn is-primary"
              >
                Read More
              </button>
            </article>
          ))}
        </div>
        
        {lolPosts.length === 0 && (
          <div className="nes-container">
            <p>No League of Legends posts yet. Click "Add LoL Post" to create your first League post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueOfLegendsBlog;