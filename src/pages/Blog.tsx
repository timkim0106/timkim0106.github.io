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

const Blog: React.FC = () => {
  const { posts, loading, addPost, updatePost, deletePost, resetPosts } = useBlogPosts();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showAdminControls, setShowAdminControls] = useState(false);

  if (loading) {
    return <div className="nes-container">Loading blog posts...</div>;
  }

  if (isCreating || editingPost) {
    return (
      <BlogEditor
        post={editingPost || undefined}
        onSave={(post) => {
          if (editingPost) {
            updatePost(post);
          } else {
            addPost(post);
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
      <p className="title">Blog</p>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p>Welcome to my blog! Here I share my thoughts on software engineering, technology, and my learning journey.</p>
        
        {showAdminControls && (
          <div className="nes-container" style={{ marginBottom: '20px', fontSize: '12px' }}>
            <h4>Debug Info:</h4>
            <p>Total posts: {posts.length}</p>
            <p>Post slugs: {posts.map(p => p.slug).join(', ')}</p>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => setIsCreating(true)} className="nes-btn is-success">
            + Add New Post
          </button>
          <button 
            onClick={() => setShowAdminControls(!showAdminControls)} 
            className="nes-btn is-warning"
          >
            {showAdminControls ? 'Hide' : 'Show'} Admin Controls
          </button>
          <Link to="/blog/league-of-legends" className="nes-btn is-primary">
            View LoL Posts
          </Link>
          {showAdminControls && (
            <>
              <button 
                onClick={() => {
                  if (window.confirm('Reset all posts to default content? This will delete any custom posts you\'ve created.')) {
                    resetPosts();
                  }
                }} 
                className="nes-btn is-error"
                style={{ fontSize: '12px' }}
              >
                Reset Posts
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }} 
                className="nes-btn is-error"
                style={{ fontSize: '12px' }}
              >
                Clear Cache
              </button>
            </>
          )}
        </div>
        
        <div style={{ marginTop: '30px' }}>
          {posts.map((post) => (
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
              
              <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#6c757d' }}>{post.date}</span>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: post.category === 'league-of-legends' ? '#dc3545' : '#ffc107',
                  color: post.category === 'league-of-legends' ? '#ffffff' : '#000000',
                  padding: '2px 6px',
                  border: '2px solid #ffffff',
                  borderRadius: '0',
                  fontFamily: 'monospace',
                  fontSize: '11px'
                }}>
                  {post.category === 'league-of-legends' ? 'LoL' : 'General'}
                </span>
              </div>
              
              <p>{post.excerpt}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                {post.tags.map((tag, index) => (
                  <span key={index} style={{
                    display: 'inline-block',
                    backgroundColor: '#6c757d',
                    color: 'white',
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
                  console.log('Navigating to:', `/blog/post/${post.slug}`);
                  window.location.href = `/blog/post/${post.slug}`;
                }}
                className="nes-btn is-primary"
              >
                Read More
              </button>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="nes-container">
            <p>No blog posts yet. Click "Add New Post" to create your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;