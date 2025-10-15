'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: string;
  created_at: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCommentStatus = async (commentId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setComments(comments.map(c =>
          c.id === commentId ? { ...c, status: newStatus } : c
        ));
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter(c => c.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const filteredComments = comments.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const stats = {
    total: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    rejected: comments.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Comment Moderation</h1>
          <p className="text-gray-600">Manage and moderate user comments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Comments</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-800">{stats.pending}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-800">{stats.approved}</div>
            <div className="text-sm text-green-600">Approved</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-800">{stats.rejected}</div>
            <div className="text-sm text-red-600">Rejected</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-3 font-medium capitalize ${
                  filter === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab} ({tab === 'all' ? stats.total : stats[tab]})
              </button>
            ))}
          </div>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading comments...</div>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No comments found</h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'No comments have been submitted yet.'
                : `No ${filter} comments.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{comment.author_name}</h3>
                        <p className="text-sm text-gray-600">{comment.author_email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      comment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : comment.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {comment.status}
                  </span>
                </div>

                {/* Comment Content */}
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'approved')}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      ✓ Approve
                    </button>
                  )}
                  {comment.status !== 'rejected' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      ✗ Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium ml-auto"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
