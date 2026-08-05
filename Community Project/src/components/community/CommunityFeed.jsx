import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, MessageSquare, Send, Image, Sparkles, LogIn, Eye, X, UserCircle2 } from 'lucide-react';

// ─── Comment Modal ───────────────────────────────────────────────────────────
const CommentModal = ({ post, isLoggedIn, currentUserId, openAuthModal, addCommentToPost, onClose }) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // lock body scroll while open
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputRef.current?.focus(), 80);
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) { openAuthModal('feed'); return; }
    if (!text.trim()) return;
    addCommentToPost(post.id, text.trim());
    setText('');
    inputRef.current?.focus();
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.18s ease'
      }}
    >
      {/* Modal Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '540px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '88vh',
          animation: 'slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.1rem 1.4rem 0.9rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageSquare size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
              Comments
            </span>
            <span style={{
              background: 'var(--primary-light)', color: 'var(--primary)',
              borderRadius: 'var(--radius-full)', padding: '0.1rem 0.6rem',
              fontSize: '0.75rem', fontWeight: 700
            }}>
              {post.comments.length}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-primary)', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: '32px', height: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', transition: 'background 0.15s, color 0.15s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-rose-light)'; e.currentTarget.style.color = 'var(--accent-rose)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-primary)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Post Preview Strip */}
        <div style={{
          padding: '0.85rem 1.4rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          display: 'flex', alignItems: 'center', gap: '0.75rem'
        }}>
          <img
            src={post.avatar} alt={post.authorName}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.1rem' }}>
              {post.authorName}
              <span style={{
                marginLeft: '0.4rem', fontSize: '0.7rem', fontWeight: 600,
                padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-full)',
                background: post.authorRole === 'NGO' ? 'var(--accent-emerald-light)' : 'var(--primary-light)',
                color: post.authorRole === 'NGO' ? 'var(--accent-emerald)' : 'var(--primary)'
              }}>
                {post.authorRole}
              </span>
            </p>
            <p style={{
              fontSize: '0.8rem', color: 'var(--text-muted)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              {post.content}
            </p>
          </div>
        </div>

        {/* Comments List */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '1rem 1.4rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem'
        }}>
          {post.comments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--text-muted)' }}>
              <MessageSquare size={36} style={{ marginBottom: '0.75rem', opacity: 0.35 }} />
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>No comments yet</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Be the first to share your thoughts!</p>
            </div>
          ) : (
            post.comments.map((c, idx) => (
              <div key={c.id} style={{
                display: 'flex', gap: '0.65rem',
                animation: `fadeIn 0.2s ease ${idx * 0.04}s both`
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <UserCircle2 size={18} color="white" />
                </div>
                <div style={{
                  background: 'var(--bg-primary)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) var(--radius-md)',
                  padding: '0.55rem 0.9rem', flex: 1
                }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.2rem' }}>
                    {c.author}
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {c.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div style={{
          padding: '0.9rem 1.4rem 1.1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={e => setText(e.target.value)}
                className="form-input"
                style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="btn btn-primary"
                style={{ padding: '0.6rem 1.1rem', borderRadius: 'var(--radius-md)', opacity: text.trim() ? 1 : 0.5 }}
              >
                <Send size={16} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => openAuthModal('feed')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}
            >
              <LogIn size={16} /> Log In to Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Feed ────────────────────────────────────────────────────────────────
export const CommunityFeed = () => {
  const {
    posts,
    createCommunityPost,
    likePost,
    addCommentToPost,
    currentUserRole,
    isLoggedIn,
    openAuthModal,
    firebaseUser
  } = useApp();

  const currentUserId = firebaseUser?.uid || 'local-user';

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [doubleTapAnim, setDoubleTapAnim] = useState({});
  const [commentModalPostId, setCommentModalPostId] = useState(null);
  const tapTimers = useRef({});

  const commentModalPost = posts.find(p => p.id === commentModalPostId) || null;

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) { openAuthModal('feed'); return; }
    if (!newPostContent.trim()) return;
    createCommunityPost(newPostContent, newPostImage || undefined);
    setNewPostContent('');
    setNewPostImage('');
  };

  const handleLike = (postId) => {
    if (!isLoggedIn) { openAuthModal('feed'); return; }
    likePost(postId);
  };

  const handleDoubleTap = (postId) => {
    if (tapTimers.current[postId]) {
      clearTimeout(tapTimers.current[postId]);
      tapTimers.current[postId] = null;
      if (!isLoggedIn) { openAuthModal('feed'); return; }
      const post = posts.find(p => p.id === postId);
      if (!post?.likedBy?.includes(currentUserId)) likePost(postId);
      setDoubleTapAnim(prev => ({ ...prev, [postId]: true }));
      setTimeout(() => setDoubleTapAnim(prev => ({ ...prev, [postId]: false })), 800);
    } else {
      tapTimers.current[postId] = setTimeout(() => {
        tapTimers.current[postId] = null;
      }, 300);
    }
  };

  const openCommentModal = (postId) => {
    if (!isLoggedIn) { openAuthModal('feed'); return; }
    setCommentModalPostId(postId);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Comment Modal */}
      {commentModalPost && (
        <CommentModal
          post={commentModalPost}
          isLoggedIn={isLoggedIn}
          currentUserId={currentUserId}
          openAuthModal={openAuthModal}
          addCommentToPost={addCommentToPost}
          onClose={() => setCommentModalPostId(null)}
        />
      )}

      {/* Feed Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> Social Impact Feed
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Community Stories &amp; Updates
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
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            marginBottom: '0.75rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem',
            background: 'var(--bg-primary)', padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-neu-sm)'
          }}>
            <Eye size={16} /> Read-Only Feed Mode
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Want to share your story or join the conversation?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto 1.25rem auto', lineHeight: 1.5 }}>
            You are viewing the Community Feed as a guest. Log in or create an account to post updates, share volunteer photos, write comments, and like posts!
          </p>
          <button onClick={() => openAuthModal('feed')} className="btn btn-primary pulse-glow" style={{ fontWeight: 700, padding: '0.6rem 1.5rem' }}>
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
                src={post.avatar} alt={post.authorName}
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

            {/* Post Content + Image — double tap zone */}
            <div
              onClick={() => handleDoubleTap(post.id)}
              style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }}
            >
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: '1rem' }}>
                {post.content}
              </p>
              {post.image && (
                <img
                  src={post.image} alt="Post Attachment"
                  style={{ width: '100%', maxHeight: '380px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                />
              )}
              {/* Double-tap heart animation */}
              {doubleTapAnim[post.id] && (
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none', animation: 'heartPop 0.8s ease forwards', zIndex: 10
                }}>
                  <Heart size={72} fill="var(--accent-rose)" color="var(--accent-rose)" />
                </div>
              )}
            </div>

            {/* Like & Comment Bar */}
            <div style={{
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '0.6rem 0', display: 'flex', gap: '1.5rem', marginBottom: '1rem'
            }}>
              {/* Like Button */}
              <button
                onClick={() => handleLike(post.id)}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'var(--accent-rose)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.9rem', fontWeight: 600,
                  transition: 'transform 0.15s ease'
                }}
                title={isLoggedIn ? (post.likedBy?.includes(currentUserId) ? 'Unlike post' : 'Like post') : 'Log in to like this post'}
              >
                <Heart
                  size={18}
                  fill={post.likedBy?.includes(currentUserId) ? 'var(--accent-rose)' : 'none'}
                  style={{ transition: 'transform 0.2s ease', transform: post.likedBy?.includes(currentUserId) ? 'scale(1.2)' : 'scale(1)' }}
                />
                {post.likes} Likes
              </button>

              {/* Comment Button — opens modal */}
              <button
                onClick={() => openCommentModal(post.id)}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'var(--primary)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.9rem', fontWeight: 600,
                  transition: 'color 0.15s, transform 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title="View & add comments"
              >
                <MessageSquare size={18} />
                {post.comments.length} Comments
              </button>
            </div>

            {/* Recent Comments Preview (last 2) */}
            {post.comments.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {post.comments.slice(-2).map(c => (
                  <div key={c.id} style={{
                    background: 'var(--bg-primary)', padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-md)', fontSize: '0.85rem',
                    display: 'flex', gap: '0.4rem'
                  }}>
                    <strong style={{ color: 'var(--primary)', flexShrink: 0 }}>{c.author}:</strong>
                    <span style={{ color: 'var(--text-main)' }}>{c.text}</span>
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <button
                    onClick={() => openCommentModal(post.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600,
                      textAlign: 'left', padding: '0.1rem 0.85rem'
                    }}
                  >
                    View all {post.comments.length} comments →
                  </button>
                )}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
