import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, MessageSquare, Share2, Send, Image, Sparkles, LogIn, Eye, Lock } from 'lucide-react';

export const CommunityFeed = () => {
  const { 
    posts, 
    createCommunityPost, 
    likePost, 
    addCommentToPost, 
    currentUserRole,
    isLoggedIn,
    openAuthModal
  } = useApp();

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openAuthModal('feed');
      return;
    }
    if (!newPostContent.trim()) return;
    createCommunityPost(newPostContent, newPostImage || undefined);
    setNewPostContent('');
    setNewPostImage('');
  };

  const handleLike = (postId) => {
    if (!isLoggedIn) {
      openAuthModal('feed');
      return;
    }
    likePost(postId);
  };

  const handleCommentSubmit = (postId) => {
    if (!isLoggedIn) {
      openAuthModal('feed');
      return;
    }
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addCommentToPost(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Feed Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> Social Impact Feed
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Community Stories & Updates
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Share your volunteer achievements, event photos, and inspire fellow students across colleges!
        </p>
      </div>

      {/* Create Post Card or Logged-Out Read-Only Callout */}
      {isLoggedIn ? (
        <div className="glass-card">
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
            Create a Community Post
          </h4>

          <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <textarea
                rows="3"
                required
                placeholder="What did your team accomplish today? Share your social impact experience..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="form-textarea"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Image size={18} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Optional Photo URL (Unsplash or image link)"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={16} /> Post Story
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-card" style={{ 
          textAlign: 'center', 
          padding: '2rem 1.5rem', 
          border: '1px dashed var(--border-color)', 
          background: 'rgba(37, 99, 235, 0.03)' 
        }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            marginBottom: '0.75rem', 
            color: 'var(--primary)', 
            fontWeight: 700, 
            fontSize: '0.85rem',
            background: 'var(--bg-primary)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-neu-sm)'
          }}>
            <Eye size={16} /> Read-Only Feed Mode
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Want to share your story or join the conversation?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 1.25rem auto', lineHeight: 1.5 }}>
            You are viewing the Community Feed as a guest. Log in or create an account to post updates, share volunteer photos, write comments, and like posts!
          </p>
          
          <button 
            onClick={() => openAuthModal('feed')}
            className="btn btn-primary pulse-glow"
            style={{ fontWeight: 700, padding: '0.6rem 1.5rem' }}
          >
            <LogIn size={18} /> Log In / Register to Post
          </button>
        </div>
      )}

      {/* Feed Posts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map(post => (
          <div key={post.id} className="glass-card">
            
            {/* Post Author Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src={post.avatar}
                alt={post.authorName}
                style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{post.authorName}</h4>
                  <span className={`badge ${post.authorRole === 'NGO' ? 'badge-emerald' : 'badge-blue'}`}>
                    {post.authorRole}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.timeAgo}</p>
              </div>
            </div>

            {/* Post Content */}
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: '1rem' }}>
              {post.content}
            </p>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post Attachment"
                style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
              />
            )}

            {/* Like & Comment Bar */}
            <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '0.6rem 0', display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
              <button
                onClick={() => handleLike(post.id)}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}
                title={isLoggedIn ? "Like post" : "Log in to like this post"}
              >
                <Heart size={18} fill={post.likes > 0 ? "var(--accent-rose)" : "none"} /> {post.likes} Likes
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <MessageSquare size={18} /> {post.comments.length} Comments
              </div>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                {post.comments.map(c => (
                  <div key={c.id} style={{ background: 'var(--bg-primary)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>{c.author}: </strong>
                    <span style={{ color: 'var(--text-main)' }}>{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder={isLoggedIn ? "Write a comment..." : "Log in to comment..."}
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                onClick={() => { if (!isLoggedIn) openAuthModal('feed'); }}
                readOnly={!isLoggedIn}
                className="form-input"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', cursor: isLoggedIn ? 'text' : 'pointer' }}
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="btn btn-secondary btn-sm"
              >
                {isLoggedIn ? "Comment" : "Log In"}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

