import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogPost from '../components/BlogPost';
import BlogEditor from '../components/BlogEditor';

const BlogPostViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, updatePost, deletePost, posts, loading } = useBlogPosts();
  const [isEditing, setIsEditing] = useState(false);
  const [showAdminControls, setShowAdminControls] = useState(false);
  
  console.log('BlogPostViewer - slug:', slug);
  console.log('BlogPostViewer - all posts:', posts);
  console.log('BlogPostViewer - loading:', loading);
  
  const post = slug ? getPostBySlug(slug) : null;
  console.log('BlogPostViewer - found post:', post);

  if (loading) {
    return <div className="nes-container">Loading post...</div>;
  }

  if (!post && !loading) {
    return (
      <div className="nes-container">
        <h2>Post Not Found</h2>
        <p>Could not find post with slug: {slug}</p>
        <p>Available posts: {posts.map(p => p.slug).join(', ')}</p>
        <button onClick={() => window.location.href = '/blog'} className="nes-btn">
          Back to Blog
        </button>
      </div>
    );
  }

  if (!post) {
    return <div className="nes-container">Loading post...</div>;
  }

  if (isEditing) {
    return (
      <BlogEditor
        post={post}
        onSave={(updatedPost) => {
          updatePost(updatedPost);
          setIsEditing(false);
          // Force a re-render by updating the key
          window.location.reload();
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <button 
          onClick={() => setShowAdminControls(!showAdminControls)} 
          className="nes-btn is-warning"
          style={{ fontSize: '12px' }}
        >
          {showAdminControls ? 'Hide' : 'Show'} Admin
        </button>
      </div>
      
      <BlogPost
        key={post.id + post.content.substring(0, 50)} // Force re-render when content changes
        post={post}
        showAdminControls={showAdminControls}
        onEdit={() => setIsEditing(true)}
        onDelete={() => {
          if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(post.id);
            window.location.href = post.category === 'league-of-legends' ? '/blog/league-of-legends' : '/blog';
          }
        }}
      />
    </div>
  );
};

export default BlogPostViewer;