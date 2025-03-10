/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { getComments } from "../../api/CommentAPI";
import Comment from "./Comment";

export default function CommentList({ postId, comments, setComments }) {
  const [loading, setLoading] = useState(false);
  const [lastCommentId, setLastCommentId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;

  const lastCommentElementRef = useRef(null);

  const loadComments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newComments = await getComments(postId, lastCommentId, limit);
      const newCommentsData = newComments.content;
      console.log("comm", newCommentsData);

      if (newCommentsData.length > 0) {
        setComments((prevComments) => {
          const newCommentIds = newCommentsData.map((comment) => comment.id);
          const filteredComments = prevComments.filter(
            (comment) => !newCommentIds.includes(comment.id)
          );
          return [...filteredComments, ...newCommentsData];
        });
        setLastCommentId(newCommentsData[newCommentsData.length - 1].id);
      } else {
        setHasMore(false);
      }

      if (newComments.pageable.last) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadComments();
        }
      },
      { threshold: 1.0 }
    );

    if (lastCommentElementRef.current) {
      observer.observe(lastCommentElementRef.current);
    }

    return () => {
      if (lastCommentElementRef.current) {
        observer.unobserve(lastCommentElementRef.current);
      }
    };
  }, [lastCommentId, hasMore]);

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      {loading && <div>Loading...</div>}

      <div ref={lastCommentElementRef}>
        {hasMore && !loading && <div>Loading more comments...</div>}
      </div>
    </div>
  );
}
