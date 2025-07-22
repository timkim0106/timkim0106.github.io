import React, { useState, useEffect } from 'react';

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

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    category: 'general' as 'general' | 'league-of-legends'
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags.join(', '),
        category: post.category
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    const blogPost: BlogPost = {
      id: post?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      date: post?.date || new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: formData.category,
      slug: slug
    };

    onSave(blogPost);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="nes-container with-title">
      <p className="title">{post ? 'Edit Blog Post' : 'Create New Blog Post'}</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="nes-field" style={{ marginBottom: '20px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="nes-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field" style={{ marginBottom: '20px' }}>
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            className="nes-textarea"
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief description that appears on the blog list..."
            required
          />
        </div>

        <div className="nes-field" style={{ marginBottom: '20px' }}>
          <label htmlFor="category">Category</label>
          <div className="nes-select">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="general">General</option>
              <option value="league-of-legends">League of Legends</option>
            </select>
          </div>
        </div>

        <div className="nes-field" style={{ marginBottom: '20px' }}>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="nes-input"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, TypeScript, Gaming..."
          />
        </div>

        <div className="nes-field" style={{ marginBottom: '20px' }}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="nes-textarea"
            rows={15}
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here using simple formatting..."
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="nes-btn is-primary">
            {post ? 'Update Post' : 'Create Post'}
          </button>
          <button type="button" onClick={onCancel} className="nes-btn">
            Cancel
          </button>
        </div>
      </form>

      <div className="nes-container" style={{ marginTop: '30px' }}>
        <h3>Content Formatting Tips:</h3>
        <ul className="nes-list is-disc">
          <li>Use ## for main headings (like ## My Heading)</li>
          <li>Use ### for subheadings (like ### Sub Heading)</li>
          <li>Use **text** for bold text</li>
          <li>Use *text* for italic text</li>
          <li>Leave blank lines between paragraphs</li>
          <li>Just write naturally - no HTML needed!</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogEditor;