"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import type { Comment } from "@/lib/types"

interface CommentsProps {
  comments: Comment[]
  articleId?: string
  opportunityId?: string
  onSubmit: (content: string) => Promise<void>
  onDelete?: (commentId: string) => Promise<void>
}

export function Comments({ comments, articleId, opportunityId, onSubmit, onDelete }: CommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(newComment)
      setNewComment("")
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">
                  {comment.author.name[0].toUpperCase()}
                </span>
              </div>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{comment.author.name}</h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(comment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                )}
              </div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  )
}
