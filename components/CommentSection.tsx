'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Comment {
 id: string;
 author_name: string;
 content: string;
 created_at: Date;
}

interface CommentSectionProps {
 postId: string;
 comments: Comment[];
}

export function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
 const t = useTranslations('commentSection');
 const [comments, setComments] = useState<Comment[]>(initialComments);
 const [authorName, setAuthorName] = useState('');
 const [authorEmail, setAuthorEmail] = useState('');
 const [content, setContent] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

 const handleSubmit = async (e: React.FormEvent) =>{
 e.preventDefault();
 setIsSubmitting(true);
 setMessage(null);

 try {
 const response = await fetch('/api/comments', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({
 postId,
 authorName,
 authorEmail,
 content,
 }),
 });

 const data = await response.json();

 if (response.ok) {
 setMessage({
 type: 'success',
 text: t('successMessage'),
 });
 // Reset form
 setAuthorName('');
 setAuthorEmail('');
 setContent('');
 } else {
 setMessage({
 type: 'error',
 text: data.error || t('errorMessage'),
 });
 }
 } catch (error) {
 setMessage({
 type: 'error',
 text: t('generalError'),
 });
 } finally {
 setIsSubmitting(false);
 }
 };

 const formatDate = (date: Date) =>{
 return new Date(date).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 });
 };

 return (
 <section className="py-12 bg-background-light">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 {/* Comments Header */}
 <div className="mb-8">
 <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
 {t('commentsTitle', { count: comments.length })}
 </h2>
 <p className="text-text-secondary">
 {t('joinConversation')}
 </p>
 </div>

 {/* Comment Form */}
 <div className="bg-white rounded-lg border border-background-gray p-6 mb-8 shadow-sm">
 <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
 {t('leaveComment')}
 </h3>

 <form onSubmit={handleSubmit} className="space-y-4">
 {/* Name and Email Row */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label
 htmlFor="authorName"
 className="block text-sm font-medium text-text-secondary mb-1"
 >
 {t('nameLabel')}
 </label>
 <input
 type="text"
 id="authorName"
 value={authorName}
 onChange={(e) =>setAuthorName(e.target.value)}
 required
 className="w-full px-4 py-2 border border-background-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 placeholder={t('namePlaceholder')}
 />
 </div>
 <div>
 <label
 htmlFor="authorEmail"
 className="block text-sm font-medium text-text-secondary mb-1"
 >
 {t('emailLabel')}
 </label>
 <input
 type="email"
 id="authorEmail"
 value={authorEmail}
 onChange={(e) =>setAuthorEmail(e.target.value)}
 required
 className="w-full px-4 py-2 border border-background-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 placeholder={t('emailPlaceholder')}
 />
 </div>
 </div>

 {/* Comment Content */}
 <div>
 <label
 htmlFor="content"
 className="block text-sm font-medium text-text-secondary mb-1"
 >
 {t('commentLabel')}
 </label>
 <textarea
 id="content"
 value={content}
 onChange={(e) =>setContent(e.target.value)}
 required
 rows={5}
 className="w-full px-4 py-2 border border-background-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
 placeholder={t('commentPlaceholder')}
 />
 <p className="text-xs text-text-muted mt-1">
 {t('characterCount', { count: content.length })}
 </p>
 </div>

 {/* Message Display */}
 {message && (
 <div
 className={`p-4 rounded-lg ${
 message.type === 'success'
 ? 'bg-green-50 text-green-800 border border-green-200'
 : 'bg-red-50 text-red-800 border border-red-200'
 }`}
 >
 {message.text}
 </div>
 )}

 {/* Submit Button */}
 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-heading font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isSubmitting ? t('submitting') : t('postComment')}
 </button>
 </form>
 </div>

 {/* Comments List */}
 {comments.length >0 ? (
 <div className="space-y-6">
 {comments.map((comment) =>(
 <article
 key={comment.id}
 className="bg-white rounded-lg border border-background-gray p-6 shadow-sm"
 >
 {/* Comment Header */}
 <div className="flex items-start justify-between mb-3">
 <div className="flex items-center gap-3">
 {/* Avatar */}
 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-heading font-semibold">
 {comment.author_name.charAt(0).toUpperCase()}
 </div>
 <div>
 <h4 className="font-heading font-semibold text-text-primary">
 {comment.author_name}
 </h4>
 <p className="text-xs text-text-muted">
 {formatDate(comment.created_at)}
 </p>
 </div>
 </div>
 </div>

 {/* Comment Content */}
 <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
 {comment.content}
 </p>
 </article>
 ))}
 </div>
 ) : (
 <div className="text-center py-12 bg-white rounded-lg border border-background-gray">
 <div className="mb-4"></div>
 <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
 {t('noComments')}
 </h3>
 <p className="text-text-secondary">
 {t('beTheFirst')}
 </p>
 </div>
 )}
 </div>
 </section>
 );
}
