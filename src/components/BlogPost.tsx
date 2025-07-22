import React from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';

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

interface BlogPostProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
  showAdminControls?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onEdit, onDelete, showAdminControls = false }) => {
  const formatContent = (content: string) => {
    console.log('formatContent - input:', content);
    
    // If content already has HTML tags, return as is
    if (content.includes('<p>') || content.includes('<h2>')) {
      console.log('formatContent - already HTML, returning as is');
      return { __html: content };
    }
    
    // Convert markdown-style formatting to HTML
    const lines = content.split('\n');
    const htmlLines: string[] = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push('');
        continue;
      }
      
      // Handle headings
      if (line.startsWith('## ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push(`<h2 class="nes-text is-primary">${line.substring(3)}</h2>`);
      } else if (line.startsWith('### ')) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        htmlLines.push(`<h3>${line.substring(4)}</h3>`);
      } else if (line.startsWith('- ')) {
        if (!inList) {
          htmlLines.push('<ul class="nes-list is-disc">');
          inList = true;
        }
        let listItem = line.substring(2);
        // Handle bold and italic in list items
        listItem = listItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        listItem = listItem.replace(/\*(.*?)\*/g, '<em>$1</em>');
        htmlLines.push(`<li>${listItem}</li>`);
      } else {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        // Handle bold and italic in paragraphs
        let paragraph = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        paragraph = paragraph.replace(/\*(.*?)\*/g, '<em>$1</em>');
        htmlLines.push(`<p>${paragraph}</p>`);
      }
    }
    
    if (inList) {
      htmlLines.push('</ul>');
    }
    
    const htmlContent = htmlLines.join('\n');
    console.log('formatContent - output:', htmlContent);
    
    return { __html: htmlContent };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'league-of-legends':
        return '#dc3545';
      default:
        return '#ffc107';
    }
  };

  return (
    <div className="nes-container with-title">
      <p className="title">{post.title}</p>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link 
            to={post.category === 'league-of-legends' ? '/blog/league-of-legends' : '/blog'} 
            className="nes-btn" 
            style={{ 
              backgroundColor: '#495057', 
              color: '#ffffff', 
              borderColor: '#ffffff',
              fontSize: '12px'
            }}
          >
            ← Back to {post.category === 'league-of-legends' ? 'LoL Posts' : 'All Posts'}
          </Link>
          
          {showAdminControls && (
            <>
              {onEdit && (
                <button onClick={onEdit} className="nes-btn is-warning" style={{ fontSize: '12px' }}>
                  Edit Post
                </button>
              )}
              {onDelete && (
                <button onClick={onDelete} className="nes-btn is-error" style={{ fontSize: '12px' }}>
                  Delete Post
                </button>
              )}
            </>
          )}
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: '#6c757d' }}>{post.date}</span>
          <span style={{
            display: 'inline-block',
            backgroundColor: getCategoryColor(post.category),
            color: post.category === 'league-of-legends' ? '#ffffff' : '#000000',
            padding: '2px 6px',
            border: '2px solid #ffffff',
            borderRadius: '0',
            fontFamily: 'monospace',
            fontSize: '11px'
          }}>
            {post.category === 'league-of-legends' ? 'League of Legends' : 'General'}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
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
        )}

        <article 
          style={{ lineHeight: '1.6', marginTop: '30px' }}
          dangerouslySetInnerHTML={formatContent(post.content)}
        />
      </div>
    </div>
  );
};

export default BlogPost;